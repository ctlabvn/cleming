import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Text} from "native-base";
import {Dimensions, InteractionManager, View} from "react-native";
// import Points from './options'
import supercluster from './supercluster'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

import shallowEqual from 'fbjs/lib/shallowEqual'

import api from "~/store/api"
import {getSession} from "~/store/selectors/auth";

import Marker from './Marker'
import styles from './styles'
import {DEFAULT_MAP_DELTA} from "~/store/constants/app";

@connect(state => ({
    xsession: getSession(state),    
}))
export default class extends React.PureComponent {

  constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 21.0461027,
                longitude: 105.7955732,
                latitudeDelta: DEFAULT_MAP_DELTA.LAT,
                longitudeDelta: DEFAULT_MAP_DELTA.LONG,
            },
        }
        this.maxZoom = 16

        this.cluster = supercluster({
          radius: styles.markerCustomer.width * 2,
          maxZoom: this.maxZoom,
        })
    }


  setRegion(region) {
    this.setState({
      region: region[0] || region
    })  
  }

  componentDidMount(){
    const { xsession } = this.props
    let minLa = this.state.region.latitude - this.state.region.latitudeDelta
    let minLo = this.state.region.longitude - this.state.region.longitudeDelta
    let maxLa = this.state.region.latitude + this.state.region.latitudeDelta
    let maxLo = this.state.region.longitude + this.state.region.longitudeDelta
    let placeIds = 559812    
    let fromTime = 1499101200
    let toTime = 1499705999
    api.report.getMapStatistic(xsession, placeIds, minLa, minLo, maxLa, maxLo, this.maxZoom, fromTime, toTime)
    .then(ret=>{
      const clusterData = ret.updated.data.locationDtos.map((item, index)=>{
        const point = {
            // numPoints: item.number,
            properties: {
              _id: index,
            },
            geometry: {              
              coordinates: [
                item.longitude,
                item.latitude,
              ]
          }
        }
        if(item.number > 1){
          point.numPoints = item.number
          point.properties.remote = true
        }
        return point
      })     
    

      console.log(clusterData[0])
      this.cluster.load(clusterData);
      this.forceUpdate()
    })
          
  }

  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.state.region, nextState.region)
  }


  createMarkers() {
    const padding = 0.25;    
    if (this.cluster.points) {
      const markers = this.cluster.getClusters([
        this.state.region.longitude - this.state.region.longitudeDelta,
        this.state.region.latitude - this.state.region.longitudeDelta,
        this.state.region.longitude + this.state.region.longitudeDelta,
        this.state.region.latitude + this.state.region.latitudeDelta,
      ], this.getZoomLevel());
      const returnArray = [];
      const { region } = this.state;     
      // const check = {}
      markers.map((element ) =>{        
        const key = element.properties._id || ('cluster_' + element.properties.cluster_id) 
        // if(check[key]) {
        //   console.log('key', element)
        //   return
        // }
        // check[key] = true
        returnArray.push(          
            <Marker
              key={key}
              onPress={this.onPressMaker.bind(this)}
              feature={element}
              cluster={this.cluster}
              region={region}
            />
        );
      });
      return returnArray;
    }
    return [];
  }


  onPressMaker(data) {
    if (data.options.isCluster) {
      if (data.options.remote) {
        console.log("load more because it is remote");
      } else {
        this.goToRegion(data.options.region, 100)        
      }
    }
  }


  goToRegion(region, padding) {
    this.map.fitToCoordinates(region, {
      edgePadding: { top: padding, right: padding, bottom: padding, left: padding },
      animated: true,
    });
  }

  onChangeRegionComplete(region) {
    this.setRegion(region);
  }


  render() {
    
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapView
          ref={ref => { this.map = ref; }}
          style={{
            flex: 1,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.region}          
          onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}
         >
          {
            this.createMarkers()
          }
         </MapView>
      </View>
    );
  }
}