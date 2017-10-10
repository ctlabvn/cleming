import React, {Component} from 'react'
import {
    Text,
    TextInput,
    View,
    Animated,
    Button,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableHighlight,
    Image, 
    Dimensions,
    ScrollView,
    ART
} from 'react-native'
import Icon from "~/ui/elements/Icon"
const {Shape, LinearGradient} = ART
var linearGradient = new LinearGradient({
    '.1': 'blue', // blue in 1% position
    '1': 'rgba(255, 255, 255, 0)' // opacity white in 100% position
    },
    "0", "0", "0", "400"
  )
  
const {height, width} = Dimensions.get('window')
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
            inputWidth: new Animated.Value(0),
            inputWidth1: 0,
            leftBlockWidth: new Animated.Value(0),
            placeholder: 'Search',
            labelOpacity: new Animated.Value(0),
            labelTop: new Animated.Value(20),
            showMask: false,
            scale: new Animated.Value(0),
            scaleImage: new Animated.Value(1),
            scaleImage1: new Animated.Value(1),
            scrollAnimatedValue: new Animated.Value(0)
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
    onPressSearch = () => {
        console.log('Animated Search')
        Animated.spring(this.state.inputWidth, {
            toValue: 250,
        }).start()
        this.setState({inputWidth1: 250})
    }
    onFocus= ()=>{
        this.setState({placeholder: ''},
            ()=>{
                Animated.parallel([
                    Animated.spring(this.state.labelOpacity, {
                        toValue: 1,
                    }),
                    Animated.spring(this.state.labelTop, {
                        toValue: 0,
                    })
                ]).start()
               
            }
        )
        
    }
    onBlur = (text)=>{
        console.log('Text', text)
        Animated.spring(this.state.leftBlockWidth, {
            toValue: 0,
        }).start()
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
    }

    onPressMask = () => {
        if (!this.state.showMask){
            this.setState({showMask: !this.state.showMask},
                () => {
                    // Animated.sequence([
                        Animated.spring(this.state.scale, {
                            toValue: 1,
                            useNativeDriver: true, // <-- Add this
                        }).start()
                        Animated.spring(this.state.scale1, {
                            toValue: 1,
                            useNativeDriver: true, // <-- Add this
                        }).start()
                        Animated.spring(this.state.scale2, {
                            toValue: 1,
                            useNativeDriver: true, // <-- Add this
                        }).start()
                        Animated.spring(this.state.scale3, {
                            toValue: 1,
                            useNativeDriver: true, // <-- Add this
                        }).start()
                    // ]).start()
                }
            )
        }else{
            Animated.sequence([
                Animated.spring(this.state.scale, {
                    toValue: 1,
                    useNativeDriver: true, // <-- Add this
                }),
                Animated.spring(this.state.scale1, {
                    toValue: 1,
                    useNativeDriver: true, // <-- Add this
                }),
                Animated.spring(this.state.scale2, {
                    toValue: 1,
                    useNativeDriver: true, // <-- Add this
                }),
                Animated.spring(this.state.scale3, {
                    toValue: 1,
                    useNativeDriver: true, // <-- Add this
                })
            ]).start()
            this.setState({showMask: !this.state.showMask})
        }
        
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnimatedValue } } }],
                    { useNativeDriver: true } // <-- Add this
                )}
            >
                <Image 
                    source={{uri: 'https://myfreetime.files.wordpress.com/2008/12/bha46487sunset.jpg'}} 
                    style={{
                        width, height,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.7
                    }}
                    
                />
                <TouchableNativeFeedback>
                    <View style={{height: 100, backgroundColor: 'rgba(81, 45, 168, 0.7)'}}>
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', margin: 10}}>Category 1</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={{height: 100, backgroundColor: 'rgba(123, 31, 162, 0.7)'}}>
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', margin: 10}}>Category 2</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={{height: 100, backgroundColor: 'rgba(30, 136, 229, 0.7)'}}>
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', margin: 10}}>Category 3</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={{height: 100, backgroundColor: 'rgba(0, 121, 107, 0.7)'}}>
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', margin: 10}}>Category 4</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={{height: 100, backgroundColor: 'rgba(244, 81, 30, 0.7)'}}>
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', margin: 10}}>Category 5</Text>
                    </View>
                </TouchableNativeFeedback>
                {/* <Shape fill={linearGradient} /> */}
                <TouchableWithoutFeedback>
                    <Animated.View 
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            borderWidth: 10,
                            borderColor: 'rgba(252, 176, 0, 0.4)',
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 12
                        }}
                    >
                        <Animated.Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        >Start</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                
                <ScrollView horizontal={true}
                            style={{flex: 1}}
                >
                    {/* <View style={{flexDirection: 'row'}}> */}
                    <TouchableNativeFeedback onPress={()=>{
                            Animated.spring(this.state.scaleImage, {
                                toValue: 1.2
                            }).start()
                        }}>
                        <Animated.View style={{
                            margin: 20, width: 200,
                            transform: [{
                                scale: this.state.scaleImage.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                }),
                            }],
                            }}>
                            <Image 
                                source={{uri: 'https://c1.staticflickr.com/1/66/211293963_a03db70f6d_b.jpg'}}
                                style={{
                                    width: 200, 
                                    height: 250,
                                    resizeMode: 'cover',
                                    borderRadius: 5,
                                    padding: 20
                                }}
                            >
                            </Image>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 5,
                                backgroundColor: 'rgba(1, 142, 20, 0.3)'
                            }}>
                                <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold', margin: 10}}>Design</Text>
                                <Text style={{color: 'white', fontSize: 12, marginLeft: 10}}>by Hải Vũ</Text>
                            </View>
                        </Animated.View>
                    </TouchableNativeFeedback>
                    
                    <TouchableNativeFeedback onPress={()=>{
                            Animated.spring(this.state.scaleImage1, {
                                toValue: 1.2
                            }).start()
                        }}>
                        <Animated.View style={{margin: 20, width: 200,
                            transform: [{
                                scale: this.state.scaleImage1.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                }),
                            }],
                            }}>
                            <Image 
                                source={{uri: 'https://c1.staticflickr.com/1/66/211293963_a03db70f6d_b.jpg'}}
                                style={{
                                    width: 200, 
                                    height: 250,
                                    resizeMode: 'cover',
                                    borderRadius: 5,
                                    padding: 20
                                }}
                            >
                            </Image>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 5,
                                backgroundColor: 'rgba(160, 96, 0, 0.3)'
                            }}>
                                <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold', margin: 10}}>Design</Text>
                                <Text style={{color: 'white', fontSize: 12, marginLeft: 10}}>by Hải Vũ</Text>
                            </View>
                        </Animated.View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback>
                        <View style={{margin: 20, width: 200}}>
                            <Image 
                                source={{uri: 'https://c1.staticflickr.com/1/66/211293963_a03db70f6d_b.jpg'}}
                                style={{
                                    width: 200, 
                                    height: 250,
                                    resizeMode: 'cover',
                                    borderRadius: 5,
                                    padding: 20
                                }}
                            >
                            </Image>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 5,
                                backgroundColor: 'rgba(8, 59, 168, 0.3)'
                            }}>
                                <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold', margin: 10}}>Design</Text>
                                <Text style={{color: 'white', fontSize: 12, marginLeft: 10}}>by Hải Vũ</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback>
                        <View style={{margin: 20, width: 200}}>
                            <Image 
                                source={{uri: 'https://c1.staticflickr.com/1/66/211293963_a03db70f6d_b.jpg'}}
                                style={{
                                    width: 200, 
                                    height: 250,
                                    resizeMode: 'cover',
                                    borderRadius: 5,
                                    padding: 20
                                }}
                            >
                            </Image>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 5,
                                backgroundColor: 'rgba(181, 1, 1, 0.5)'
                            }}>
                                <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold', margin: 10}}>Design</Text>
                                <Text style={{color: 'white', fontSize: 12, marginLeft: 10}}>by Hải Vũ</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>


                <View style={{marginTop: 50, marginLeft: 20, 
                    flexDirection: 'row', alignItems: 'flex-end',
                    width: 300, height: 200
                }}>

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'rgba(255,255,255,0.9)',
                            position: 'absolute', bottom: 0, left: 0,
                            height: this.state.height
                        }}
                    />

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'rgba(255,255,255,0.9)',
                            position: 'absolute', bottom: 0, left: 60,
                            height: this.state.height1
                        }}
                    />

                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'rgba(255,255,255,0.9)',
                            position: 'absolute', bottom: 0, left: 120,
                            height: this.state.height2
                        }}
                    />


                    <Animated.View 
                        style={{
                            width: 50, backgroundColor: 'rgba(255,255,255,0.9)',
                            position: 'absolute', bottom: 0, left: 180,
                            height: this.state.height3
                        }}
                    />

                    
                </View>
                {/* <Button onPress={this._doAnimate} title='Animate' style={{marginTop: 50}}/> */}
                <TouchableNativeFeedback onPress={this._doAnimate}>
                    <View style={{
                        borderWidth: 2,
                        borderRadius: 3,
                        padding: 12,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        marginTop: 15
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Animate</Text>
                    </View>
                </TouchableNativeFeedback>
            </Animated.ScrollView>
            <TouchableNativeFeedback>
                 <Animated.View
                    style={{
                        width: 50, 
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        position: 'absolute', bottom: 10, right: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: this.state.scrollAnimatedValue.interpolate({
                            inputRange: [0, 60],
                            outputRange: [1, 0],
                        }),
                        transform: [{
                            translateY: this.state.scrollAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        }]
                        
                        
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white', textAlignVertical: 'center'}}>+</Text>
                </Animated.View>
            </TouchableNativeFeedback>
            </View>
        )
    }
}