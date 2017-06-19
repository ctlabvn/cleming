import material from '~/theme/variables/material'

export default {
  container: {
    borderBottomWidth: 0,        
  },
  searchContainer: {    
    backgroundColor: '#0085b6',
    borderColor:'transparent',
    borderRadius: 5,            
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft:-20,    
    width: material.deviceWidth/2 + 60,        
    height:30,    
    flexDirection:'row',  
  },
  searchIcon:{
    color:'#a7e7ff',
    paddingRight:0,
  },
  menuIcon:{
    marginLeft:0,
  },
  leftIcon: {
    color: '#fff',
    fontSize: 18,
    // marginRight:-3    
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    backgroundColor: '#fff',    
    marginLeft: 10,    
    justifyContent: 'center',
  },
  circleIcon: {
    color: material.tabBarActiveTextColor,
    fontSize: 18,
  },
  searchInput:{
    height: material.platform === 'ios' ? 30 : 50,    
    color:'#fff'
  },
  overlay: {
    position: 'absolute', 
    // backgroundColor: 'rgba(0,0,0,0.5)', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0
  }
}