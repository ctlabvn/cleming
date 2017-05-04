import React, { Component } from 'react'
import { Modal, View, TouchableWithoutFeedback } from 'react-native'
import {
  Container,
} from 'native-base'

import Header from '~/ui/components/Header'
import styles from './styles'

export default class extends Component {

  static defaultProps = {
    title: 'Modal',
  }

  renderFullModal(){
    const {open, title, children, onCloseClick} = this.props
    return (      
      <Modal
          onRequestClose={onCloseClick}
          animationType="slide"
          transparent={false}
          visible={open}          
        >          
          <Container>
            <Header type="back" title={title} onLeftClick={onCloseClick}/>            
            {children}            
          </Container>             
      </Modal>      
    )
  }

  renderModal(){
    const {open, children, onCloseClick} = this.props
    return (
      <Modal
        onRequestClose={onCloseClick}
        animationType="fade"
        transparent={true}        
        visible={open}        
        >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={onCloseClick}>
            <View style={styles.backdrop}>              
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.content}>
              {children}
          </View>
        </View>
      </Modal>
    )
  }

  render(){    
    return this.props.full ? this.renderFullModal() : this.renderModal()    
  }
}
