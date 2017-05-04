import material from '~/theme/variables/material'

export default {

  headerIconContainer:{
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 11,
    marginRight: 11,
    marginBottom: 5,    
  },

  headerText: {
    fontSize: 9,
    alignSelf: 'center',        
  },

  get headerIconContainerActive(){
    return {
      ...this.headerIconContainer, 
      borderColor: material.tabBarActiveTextColor, 
      borderWidth: 1,      
    }
  },
  // show contain ratio
  headerIcon: {
    resizeMode: 'contain', 
    height: 25,    
    width: 25,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  itemHeader: {    
    height: 40,   
    justifyContent: 'space-between',   
    paddingLeft:15,
    paddingRight:0,    
  },
  get itemHeaderLarge(){
    return {
      ...this.itemHeader,
      paddingLeft: 0,
      borderBottomWidth: 2,
      height: 50,
      borderColor: material.backgroundColor,
    }
  },
  itemBody: {    
    paddingRight:0,       
  },
  itemHeaderText:{
    fontSize: 12,    
  },
  itemHeaderButton: {
    alignSelf: 'center',
  },
  iconPush: {
    color: 'none',
    stroke: material.tabBarActiveTextColor,
    fontSize: 20,
  },
  iconGray: {
    color: material.grayColor,
  },  
  label: {
    color: material.textColor,
    fontSize: 12,
  },
  iconSmall: {
    fontSize: 12,
    marginBottom: 0,
  },
  // with align at side, use left or right for best effect
  toggleSmall:{
    alignSelf: 'center',
    marginTop: 0,
    right: 15,
  },
  buttonSmall: {
    borderColor: material.tabBarActiveTextColor,    
    borderRadius: 4,
    height: 15,        
    marginLeft: 10,
  },
}