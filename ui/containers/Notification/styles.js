import material from '~/theme/variables/material'

export default {
  container:{
    backgroundColor:'#FFF',    
  },
  listItemContainer:{
    // borderBottomWidth:0.5,
    // borderColor: material.grayColor,
    marginLeft:0,
    marginRight:0,      
    // paddingTop:0,
    paddingBottom:0,    
  },
  listItemRow:{
    // width: '100%',
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    width: 6,
    height: 6,
    marginLeft: 17,
    borderRadius: 3,
    backgroundColor: material.toolbarDefaultBg,
  },
  icon:{
    color: '#7e7e7e',
    alignSelf:'flex-start',
    fontSize: 18,    
    marginLeft:10,    
  }
}