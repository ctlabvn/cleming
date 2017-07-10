import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
const offset_map_small = 0.0001;
import { logoSource } from '~/assets'
import styles from './styles'

export default class Marker extends React.PureComponent {

  onPress() {
    if (this.props.feature.properties.point_count > 1) {

      //  Calculer l'angle
      const { region } = this.props;      
      const angle = region.longitudeDelta || 0.0421/1.2;
      const clusterZoom =  Math.round(Math.log(360 / angle) / Math.LN2);

      const item = this.props.cluster.trees[clusterZoom + 1]
      let options = {
          isCluster: true,                
      };

      if(item){      
        //  Chercher les enfants
        console.log('cluster', this.props.feature.properties.cluster_id, this.props.feature)
        const markers = this.props.cluster.getChildren(this.props.feature.properties.cluster_id, clusterZoom);      

        const newRegion = [];
        const smallZoom = 0.05;
        //  Remap
        markers.map(function (element) {
          newRegion.push({
            latitude: offset_map_small + element.geometry.coordinates[1] - region.latitudeDelta * smallZoom,
            longitude: offset_map_small + element.geometry.coordinates[0] - region.longitudeDelta * smallZoom,
          });

          newRegion.push({
            latitude: offset_map_small + element.geometry.coordinates[1],
            longitude: offset_map_small + element.geometry.coordinates[0],
          });

          newRegion.push({
            latitude: offset_map_small + element.geometry.coordinates[1] + region.latitudeDelta * smallZoom,
            longitude: offset_map_small + element.geometry.coordinates[0] + region.longitudeDelta * smallZoom,
          });
        });

        //  Préparer the retour
        options.region = newRegion;

      } else {
        options.remote = true
      }

      //  Ensuite envoyer l'événement
      if (this.props.onPress) {
        this.props.onPress({          
          feature: this.props.feature,
          options: options,
        });
      }
    }

  }


  render() {
    const latitude = this.props.feature.geometry.coordinates[1];
    const longitude = this.props.feature.geometry.coordinates[0];  
    const text = this.props.feature.properties.point_count_abbreviated || 1;
    // const fontSize = text > 99 ? (text > 9999 ? 8 : 10) : 12
    const size = 37;
    return (
      <MapView.Marker
        coordinate={{
          latitude,
          longitude,
        }}
        onPress={this.onPress.bind(this)}
      >

      <View style={styles.markerCustomer}>
          <Text style={styles.markerCustomerText}>{text}</Text>
      </View>
       
      </MapView.Marker>
    );
  }
}