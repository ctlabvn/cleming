import React, { Component } from 'react'
import { Text, Button} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import I18n from '~/ui/I18n'
import ProgressCircle from 'react-native-progress-circle'
import material from '~/theme/variables/material'
export default class PopupInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            text: props.text || '',
            percent: 0
        }
    }

    close = () => {
      this.setState({modalVisible:false, percent: 0})
    }
    open = () => {
      this.setState({modalVisible: true})
    }
    updateProgress = (percent) => {
      this.setState({percent: percent})
    }
    render() {

        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <Text>{this.props.text}</Text>
                      <ProgressCircle
                          percent={this.state.percent}
                          radius={30}
                          borderWidth={5}
                          color={material.primaryColor}
                          shadowColor="#999"
                          bgColor="#fff"
                      >
                          <Text style={{ fontSize: 17, fontWeight: 'bold', color: material.primaryColor }}>{this.state.percent}%</Text>
                      </ProgressCircle>
                    </View>
                </View>
            </Modal>
        )
    }
}
