import material from '~/theme/variables/material'

export default {
  container: {
    marginTop:7,
    marginBottom:23,
  },  
  itemHeader: {    
    height: 40,   
    justifyContent: 'center',        
  },
  itemBody: {
    height: 50,
  },
  itemHeaderText:{
    fontSize: 12,
    marginBottom:-5,  
    marginLeft: 3,  
  },

  itemBodyModal: {
    height: 60,
    paddingLeft:10,
    paddingRight:10,
  },
  labelTime:{
    width:100,
  },
  itemHeaderTextModal:{
    fontSize: 13,    
    marginLeft: 10,  
    width: material.deviceWidth - 60,
  },

  icon: {
    fontSize: 20,    
  },
  get iconGray() {      
    return {...this.icon, color: material.grayColor}
  }, 
  iconGrayLarge: {
    fontSize: 24,
    color: material.grayColor,
  },     
  get iconOk() {
    return {...this.icon, color: material.brandSuccess}
  },
  get iconCancel(){
    return {...this.icon, color: material.brandDanger}
  },
  left: {
    marginLeft: -10,    
  },

  right: {
    width: 100,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  content:{
    marginTop:10,
    backgroundColor:'red',    
    backgroundColor:'#FFF',  
      
  },
  rightContainer:{
    borderBottomWidth:0,    
    alignSelf: 'flex-end',  
    marginRight: -5,                            
    alignItems:'center',
    height: '100%',
    justifyContent:'center'
  },
  listItemContainer:{
    borderBottomWidth:0.5,
    borderColor: material.grayColor,
    marginLeft:0,
    marginRight:0,
    height: 55,
  },
  trustedModalContainer:{        
    width: material.deviceWidth - 40,
    paddingTop: 10,
    paddingRight:10,
    paddingLeft:10,        
  },
  businessModalContainer:{        
    width: material.deviceWidth - 10,        
    height: material.deviceHeight - 70,  
    paddingBottom:4,
    overflow: 'hidden',   
  },
  get listPopItemContainer(){
    return {...this.listItemContainer, height: 45,paddingTop:-10,justifyContent:'flex-start'}
  },
  thumb:{    
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  thumbLarge: {
    width: 40,
    height: 40,
    margin: 10,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 4,        
    // marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,         
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1.2,    
    height: 40,    
  },
  input: {    
    top: 0,    
    fontFamily: 'Roboto',
    fontWeight: '300',   
    height: '100%',    
  },

  buttonSearch: {    
    backgroundColor: material.tabBarActiveTextColor,
    height: '100%',       
    borderRadius: 4,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,
  },

  get rightButtonContainer(){
    return {
      ...this.rightContainer,
      flexDirection:'row',
    }    
  },

  buttonSmall: {
    borderColor: material.noteTextColor,    
    height: 18,
    paddingLeft: 3,
    paddingRight: 5,
    marginLeft: 10,
  },
  
  textSmall: {
    marginLeft: 3,
    fontSize: 9,
    lineHeight:12,
  },

  iconGraySmall: {
    fontSize: 10,
    color: material.grayColor,
    marginRight: 0,
  }, 

  actionSheet:{    
    width: '100%',                
    paddingLeft:5,   
    borderRightWidth: 1,    
    borderWidth:1, 
    borderRadius: 4,
    borderColor: material.grayColor,    
    marginBottom: 10,
    marginTop: 20,
    height: 40,
  },
  actionSheetIcon:{
    color: material.textColor,    
    fontSize: 20,    
  },
  actionSheetText: {
    fontSize: 12,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 40,
    marginBottom: -20,
  },
  button: {
    borderRadius: 4,
    height: 40,
    padding:10,
    width: '48%',
  },

  get cancelButton() {
    return {...this.button, backgroundColor:material.grayColor}
  },

  get okButton() {
    return {...this.button, backgroundColor:material.toolbarDefaultBg}    
  },
}