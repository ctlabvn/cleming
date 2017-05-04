import material from '~/theme/variables/material'

export default {
  container: {
    borderRadius:5,   
    marginBottom:20, 
    borderWidth:0,
  },
  headerContainer:{
    paddingBottom:0
  },
  footerContainer:{ 
    justifyContent: 'space-around',
    borderBottomLeftRadius:5,
    borderBottomRightRadius: 5,     
  },
  avatarContainer:{
    borderTopWidth: material.platform === 'android' ? 1 : 0,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  firstCard:{    
    borderTopLeftRadius:5,
    borderTopRightRadius: 5,             
  },
  text: {    
    color: material.tabBarActiveTextColor,
  },
  icon: {
    color: material.tabBarActiveTextColor,
    marginLeft:-5,
    fontSize: 15,
  },
  image:{ 
    resizeMode: 'cover',    
    width:'100%',
    height:material.deviceWidth * 0.6,
  },
  textGray: {    
    color: '#757575'
  },
  textGreen:{
    color:'#00a651',
    marginBottom:5,
  },
  iconGray: {    
    color: '#757575',
    fontSize:30,
  },
  button: {
    borderColor: material.tabBarActiveTextColor,
    width: '100%',
  }
}