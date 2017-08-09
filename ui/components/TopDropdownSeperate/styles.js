import material from '~/theme/variables/material'
export default {
    dropdownContainerAndroid:{
        position: 'absolute',
        top: material.toolbarHeight,
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        elevation: 2,
        justifyContent: 'center',
        // flex: 1,
        // top: material.toolbarHeight
    },
    dropdownContainerIos:{
        position: 'absolute',
        top: material.toolbarHeight,
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        // flex: 1,
        // top: material.toolbarHeight
    },

    dropdownContainerAndroidFull:{
        position: 'absolute',
        top: material.toolbarHeight,
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        elevation: 100,
        justifyContent: 'center',        
        // flex: 1,
        // height: material.deviceHeight,
        // top: material.toolbarHeight+50
    },
    dropdownContainerIosFull:{
        position: 'absolute',
        top: material.toolbarHeight,
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        // flex: 1,
        // height: material.deviceHeig.ht,
        // top: material.toolbarHeight+50
    },

    dropdownHeader:{
        justifyContent:'center',
        backgroundColor: material.primaryColor,
        // flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,                    
        height: 50,
    },

    dropdownHeaderPlus:{
        justifyContent:'center',
        backgroundColor: material.primaryColor,
        // flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        height: 100,
    },

    dropdownSelectedValue:{        
        color: material.white500,
        fontWeight: 'bold',      
        paddingHorizontal: 40,
        textAlign: 'center'  
    },
    dropdownIcon:{
        marginTop: -10,      
        width: '100%',      
        justifyContent: 'center',        
    },
    dropdownList:{
        backgroundColor: 'transparent',
        width: '100%',        
        zIndex: 1000,
        elevation: 10,
        position: 'absolute',
        top: 50

    },
    dropdownListItem:{
        borderBottomWidth: 0,
        justifyContent: 'center',
        zIndex: 1000,    
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
        // flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        elevation: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    },
    searchContainer: {    
        // backgroundColor: '#0085b6',
        borderColor:'#fff',
        borderRadius: 0,     
        marginTop: 20,
        marginRight: 20,            
        marginLeft: 25,        
        borderWidth: 0.5,
        height:30,    
        flexDirection:'row',        
      },
      searchInput:{
        fontSize: 14,
        height: material.platform === 'ios' ? 30 : 50,
        borderWidth: 0,
        marginLeft:-5,
        paddingLeft: 20,
        color:'#fff',
      },

}