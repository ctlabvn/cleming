import material from '~/theme/variables/material'

export default {
  container: {
    marginTop:10,
    marginBottom:10,
  },
  filterContainer:{
    marginTop: 10,
  },
  itemHeader: {    
    height: 40,           
  },
  itemBody: {
    height: 50,
  },
  itemHeaderText:{
    fontSize:15,
  },
  buttonCenter:{
    alignSelf:'center',
    marginRight: -10,
  },
  labelTime:{
    marginTop:5
  },
  iconFilter: {
    color: material.linkTextColor,
    marginRight: 10,
    fontSize: 20,
  },
  iconFilterNormal: {    
    fontSize: 20,
    color: material.grayColor,    
    paddingRight: 5,
  },
  get iconFilterActive(){
    return {...this.iconFilterNormal, color: material.tabBarActiveTextColor}
  },
  buttonClear:{
    alignSelf: 'flex-end',
    paddingRight:5,
    height: 25,
    paddingBottom:0,
  },
  modalContent: {
    margin: 10,
    marginTop: 20,
  }
}