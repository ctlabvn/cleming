import React, { Component } from 'react'
import Scandit, { ScanditPicker, ScanditSDKVersion } from 'react-native-scandit'
import { Container, View, Text } from 'native-base'

Scandit.setAppKey('4PUORZUeH5w4NCNc8eOwY051nwZslOjy21F8bziwDZg')

export default class extends Component {
  render() {
    return (
      <Container>
      <View style={{ flex: 1 }}>
        <ScanditPicker
          ref={(scan) => { this.scanner = scan; }}
          style={{ flex: 1 }}
          settings={{
            enabledSymbologies: ['QR'],
            cameraFacingPreference: 'back'
          }}
          onCodeScan={(code) => {alert(code.data);}}
        />
      <Text>Using Scandit SDK {ScanditSDKVersion}</Text>
      </View>
      </Container>
    );
  }
}