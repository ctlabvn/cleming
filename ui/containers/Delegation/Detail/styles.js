import material from '~/theme/variables/material'

export default {
  right: {
    flexDirection:'row',
    justifyContent:'space-between', 
    flex:1,                        
  },
  left: {
    flex: 1,
  },
  iconLabel:{
    color: material.linkTextColor,
    marginLeft:5,
    fontSize:15,
  },
  textareaContainer: {
    height: 100,
    marginTop: 15,
    marginBottom: 10,
  },
  textarea:{
    height: '100%',    
  },
  label: {
    fontSize:14,
  },
  button: {
    backgroundColor: material.linkTextColor,
    borderRadius: 5,
    marginTop: 10,
  },
  mt15:{
    marginTop: 15,
  },
  mt5:{
    marginTop:5
  },
  dateLabel:{
    marginLeft:15,
    fontSize: 14,
  },
  dateInput:{
    fontSize:14,
  },
  dateIcon:{
    fontSize:20,
  },
  dateContainer:{
    marginTop:0,
    backgroundColor:'transparent',
    width:150,          
    borderWidth:0,        
  },
  listItem:{
    marginLeft:10,
    marginRight:10,
    paddingLeft:10,
    paddingRight:10,
    height:40,
  },
  listItemFull:{
    paddingLeft:15,
    paddingRight: 15,
  }
}