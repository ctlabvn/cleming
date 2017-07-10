import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
const offset_map_small = 0.0001;
import { logoSource } from '~/assets'
import styles from './styles'

export default class Marker extends React.PureComponent {

  state = {
    colorByCategory: {
      A: "violet",
      B: "yellow",
      C: "blue",
      D: "pink",
      E: "green",
      "Cluster": "red"
    }
  }

  onPress() {
    if (!this.props.feature.properties.featureclass) {
      //  Calculer l'angle
      const { region } = this.props;
      const category = this.props.feature.properties.featureclass || "Cluster";
      const angle = region.longitudeDelta || 0.0421/1.2;
      const result =  Math.round(Math.log(360 / angle) / Math.LN2);
      //  Chercher les enfants
      const markers = this.props.clusters["places"].getChildren(this.props.feature.properties.cluster_id, result);
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
      const options = {
        isCluster: true,
        region: newRegion,
      };
      //  Ensuite envoyer l'événement
      if (this.props.onPress) {
        this.props.onPress({
          type: category,
          feature: this.props.feature,
          options: options,
        });
      }
    }
  }


  render() {
    const latitude = this.props.feature.geometry.coordinates[1];
    const longitude = this.props.feature.geometry.coordinates[0];
    const category = this.props.feature.properties.featureclass || "Cluster";
    const text = (category  == "Cluster" ? this.props.feature.properties.point_count : category);
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