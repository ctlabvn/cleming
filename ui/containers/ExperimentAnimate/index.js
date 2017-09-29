import React, {Component} from 'react'
import {
    Text,
    View,
    Animated,
    Button
} from 'react-native'

export default class ExperimentAnimate extends Component {

    constructor(props){
        super(props)
        this.state = {
            scale1: new Animated.Value(0),
            scale2: new Animated.Value(0),
            scale3: new Animated.Value(0),
            scale4: new Animated.Value(0),
            translateY1: new Animated.Value(110),
            width: new Animated.Value(0),
            height: new Animated.Value(0),
            height1: new Animated.Value(0),
            height2: new Animated.Value(0),
            height3: new Animated.Value(0),
        }
    }

    // const STYLES_WHITELIST = {
    //     opacity: true,
    //     transform: true,
    //     /* legacy android transform properties */
    //     scaleX: true,
    //     scaleY: true,
    //     translateX: true,
    //     translateY: true,
    //   };

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }
    
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _doAnimate = () => {
        Animated.parallel([
            Animated.spring(this.state.height, {
                toValue: this.getRandomInt(0, 150),
            }),
            Animated.spring(this.state.height1, {
                toValue: this.getRandomInt(0, 150),
            }),
            Animated.spring(this.state.height2, {
                toValue: this.getRandomInt(0, 150),
            }),
            Animated.spring(this.state.height3, {
                toValue: this.getRandomInt(0, 150),
            }),
        ]).start();
    }
    componentDidMount() {
        Animated.parallel([
            Animated.spring(this.state.height, {
                toValue: 120,
                duration: 5000,
            }),
            Animated.spring(this.state.height1, {
                toValue: 70,
                duration: 5000,
            }),
            Animated.spring(this.state.height2, {
                toValue: 140,
                duration: 5000,
            }),
            Animated.spring(this.state.height3, {
                toValue: 30,
                duration: 5000,
            }),
        ]).start();

        // Animated.parallel([
        //     Animated.timing(this.state.scale1, {
        //         toValue: 1,
        //         duration: 500,
        //         useNativeDriver: true, // <-- Add this
        //     }),
        //     Animated.timing(this.state.scale2, {
        //         toValue: 1,
        //         duration: 500,
        //         useNativeDriver: true, // <-- Add this
        //     }),
        //     Animated.timing(this.state.scale3, {
        //         toValue: 1,
        //         duration: 500,
        //         useNativeDriver: true, // <-- Add this
        //     }),
        //     Animated.timing(this.state.scale4, {
        //         toValue: 1,
        //         duration: 500,
        //         useNativeDriver: true, // <-- Add this
        //     })
        // ]).start();
    }

    render() {
        return (
            <View>
                <View style={{marginTop: 50, marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end',
                    width: 300, height: 200, backgroundColor: 'yellow'
                }}>
                    {/* <Animated.View 
                        style={{
                            height: 50, width: 50, backgroundColor: 'red', marginRight: 10,
                            position: 'absolute', bottom: 0, left: 0,
                            transform: [{
                                scaleY: this.state.scale1.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 0.5, 1]
                                }),
                            }],
                        }}
                    />
                    
                    <Animated.View 
                        style={{
                            height: 150, width: 50, backgroundColor: 'red',
                            position: 'absolute', left: 60,
                            transform: [{
                                scaleY: this.state.scale2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                    extrapolate: 'extend',
                                }),
                            }],
                        }}
                    />

                    <Animated.View 
                        style={{
                            height: 120, width: 50, backgroundColor: 'red',
                            position: 'absolute', bottom: 0, left: 120,
                            transform: [{
                                translateY: this.state.translateY1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-1, 0],
                                }),
                            }],
                        }}
                    /> */}

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'red',
                            position: 'absolute', bottom: 0, left: 0,
                            height: this.state.height
                        }}
                    />

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'red',
                            position: 'absolute', bottom: 0, left: 60,
                            height: this.state.height1
                        }}
                    />

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'red',
                            position: 'absolute', bottom: 0, left: 120,
                            height: this.state.height2
                        }}
                    />


                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'red',
                            position: 'absolute', bottom: 0, left: 180,
                            height: this.state.height3
                        }}
                    />


                    {/* <Animated.View 
                        style={{
                            height: 120, width: 50, backgroundColor: 'red', marginRight: 10,
                            transform: [{
                                scaleY: this.state.scale3.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]  // 0 : 150, 0.5 : 75, 1 : 0
                                }),
                            }],
                        }}
                    />

                    <Animated.View 
                        style={{
                            height: 70, width: 50, backgroundColor: 'red', marginRight: 10,
                            transform: [{
                                scaleY: this.state.scale3.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]  // 0 : 150, 0.5 : 75, 1 : 0
                                }),
                            }],
                        }}
                    /> */}
                    
                </View>
                <Button onPress={this._doAnimate} title='Animate' />
            </View>
        )
    }
}