import material from '~/theme/variables/material'
export default {
    dropdownContainerAndroid:{
        position: 'absolute',
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        elevation: 100,
        justifyContent: 'center',
        flex: 1,
    },
    dropdownContainerIos:{
        position: 'absolute',
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        flex: 1,
    },

    dropdownContainerAndroidFull:{
        position: 'absolute',
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        elevation: 100,
        justifyContent: 'center',
        flex: 1,
        height: material.deviceHeight,
    },
    dropdownContainerIosFull:{
        position: 'absolute',
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        flex: 1,
        height: material.deviceHeight
    },

    dropdownHeader:{
        justifyContent:'center',
        backgroundColor: material.primaryColor,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 0,
        height: 50,
        width: '100%',
    },
    dropdownSelectedValue:{
        color: material.white500,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    dropdownIcon:{
        position: 'absolute',
        // right: 0,
        width: '100%',

    },
    dropdownList:{
        backgroundColor: 'transparent',
        width: '100%',        
        zIndex: 1000,
    },
    dropdownListItem:{
        borderBottomWidth: 0,
        justifyContent: 'center',
        zIndex: 1000
    },  
    dropdownListItemText:{
        color: material.white500,
        fontWeight: '100'
    },
    content:{
        position: 'absolute',
        top: 75
    },
    overlay: {
        flex: 1, 
        // backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        elevation: 10
    },
    backdrop:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10
    },
    get backdropClose() {
        return {...this.backdrop, opacity:0}
    }

}