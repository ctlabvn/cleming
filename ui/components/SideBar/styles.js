import material from '~/theme/variables/material'

export default {
  container: {
    flex: 1, 
    backgroundColor: '#00a9d4',    
    // top: 20,
  },
  buttonClose:{
    position: 'absolute',
    left: 0,    
    paddingLeft: 5,
  },
  buttonIconClose:{
    color: '#fff',
    fontSize: 20,
  },
  drawerCover: {
    justifyContent: 'center',
    alignItems: 'center',    
    position: 'relative',   
    height: 50,         
  },

  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',  
    marginLeft: 0,      
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: (material.platform === 'android') ? 7 : 5,
  },

  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: (material.platform === 'android') ? 21 : 25,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  text: {    
    color: '#FFF',  
    marginTop: 10,  
    alignSelf: 'flex-start',
  },
  icon: {    
    width: 20,
    height: 20,
  },
  editContainer:{
    flexDirection:'row',
    paddingLeft:35
  },
  iconEdit: {    
    marginLeft: 10, 
    marginTop: -10,
    color: '#fff',    
    width: 25,
    height: 25,
  },
  iconText: {
    fontSize: 14,
    fontWeight: '300',    
    textAlign: 'center',    
    color: '#FFF',
    marginLeft: 15,
  },
  iconTextLast: {
    color: '#ce2d30',
    paddingLeft: 20,
  }
};