import material from '~/theme/variables/material'

export default {
  modalContent: {
    margin: 10,
    marginTop: 20,
  },
  itemHeader: {    
    height: 35,   
    justifyContent: 'space-between',   
    paddingLeft:15,
    paddingRight:0,    
  },
  itemHeaderButtonFilter:{
    justifyContent: 'center',
    alignSelf:'center',
    flex:1,
    height: 30,
    borderRadius:0,
  },
  itemBody: {
    height: 50,    
    paddingRight:0,  
    paddingLeft:10, 
  },
  itemHeaderText:{
    fontSize: 12,    
  },
  itemHeaderButton: {
    alignSelf: 'center',
    paddingRight:0,
  },
  itemHeaderButtonFirst: {
    alignSelf: 'center',
    right:0,
    paddingRight:10,
    position: 'absolute', 
  },
  iconGray: {
    color: material.grayColor,
  },
  iconSmall: {
    fontSize: 20,
  },
  iconGrayFirst: {
    color: material.grayColor,
    fontSize: 12,
    marginRight: 5,
  },
  pushButton: {
    borderColor:material.grayColor,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    paddingTop: 0,                
    marginRight:-20,               
    paddingLeft: 9,
    paddingRight:6,
    paddingBottom:0,
    alignSelf:'center',
    height:15,
  }
}