import React, {Component} from "react";
import {ActivityIndicator} from "react-native";
import material from "~/theme/variables/material.js";

export default class extends Component {

  static defaultProps = {
    color: material.primaryColor,
    size: 'large',
  }

  constructor(props) {
    super(props);  
    this.state = {
      shown: props.shown
    }
  }

  componentDidMount(){
    this.props.onItemRef && this.props.onItemRef(this)
  }

  show(shown){
    this.setState({shown})
  }

  render(){
    const {color, size} = this.props
    return (
      this.state.shown ? <ActivityIndicator size={size} color={color}/> : null        
    )
  }
} 