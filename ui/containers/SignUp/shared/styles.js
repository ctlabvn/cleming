import material from '~/theme/variables/material'

export default {
  form: {

  },
  actionSheetContainer:{
    flexDirection:'column',
    paddingLeft:0,
    paddingRight:0,
    backgroundColor: 'transparent',
    marginBottom: 20,
    borderWidth:0,
  },
  actionSheet:{    
    width: '100%',    
    borderRightWidth:0,    
    borderBottomWidth:0,
    paddingLeft:10,        
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
  },
  actionSheetIcon:{
    color: material.grayColor,   
    fontSize: 20, 
    marginRight:-5,

  },
  inputStyle:{
    paddingLeft:15,
    paddingRight:15,    
    width: '100%',
    borderRadius: 4,
    height: 45,
    backgroundColor: '#fff',
    fontSize: material.fontSizeBase,
  },
  input:{
    color: material.grayColor,
  },
  inputMargin:{
    marginTop: 20,
  },
  label:{    
    fontSize: 12,
    marginTop: 10,
    paddingLeft:5,
    letterSpacing: -0.5,
    color: material.textColor,
  },
  labelHeader: {
    marginTop: 10,    
    fontSize: 14,
    alignSelf: 'center',
  },  
  labelContainer:{
    flexDirection: 'row',
    alignItems:'flex-start',   
    marginRight:10, 
  },
  signupButton:{
    marginTop: 10,
    backgroundColor: material.tabBarActiveTextColor,
    borderRadius: 4,
  },
  pinCodeContainer:{
    marginTop:20,
    marginBottom:20,
    width: 150,
    height: 60,
    alignSelf: 'center',                  
    flexDirection: 'row',
  },
  pinCodeInput:{
    textAlign: 'center',
    fontSize: 30,
  },
  pinCodeInputSmall:{
    textAlign: 'center',
  }
}