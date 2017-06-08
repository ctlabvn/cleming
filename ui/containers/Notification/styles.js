import material from '~/theme/variables/material'

export default {
  container:{
    backgroundColor: material.white500,
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
    height: 50,    
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  titleContainer:{
    height: '100%',
    justifyContent: 'space-between',
  },
  circle: {
    width: 6,
    height: 6,
    marginLeft: 17,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: material.toolbarDefaultBg,
  },
  icon:{
    color: material.gray600,
    alignSelf:'flex-start',
    fontSize: 18,    
    marginLeft:10,    
  },
  textGray: {
    color: material.gray600
  },
}