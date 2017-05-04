import material from '~/theme/variables/material'

export default {
  container:{
    margin:5,
    backgroundColor:'transparent'
  },
  content:{
    marginTop:10,
    backgroundColor:'red',    
    backgroundColor:'#FFF',  
      
  },
  rightContainer:{
    borderBottomWidth:0,
    flexDirection:'row',
    width:100,                              
    paddingRight:5,
    alignItems:'center',
    justifyContent:'space-between'
  },
  listItemContainer:{
    borderBottomWidth:0.5,
    borderColor: material.grayColor,
    marginLeft:0,
    marginRight:0,
    height: 65,
  },
  thumb:{
    borderRadius: 3,
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  button: {
    height: 18,
    paddingTop:material.platform === 'ios' ? 5 : -5,    
  },
}