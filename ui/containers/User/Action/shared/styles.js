import material from '~/theme/variables/material'

export default {
  form: {
    
  },
  textPadder: {
    margin:10,
    paddingLeft:20,
    paddingRight:20,
                
  },
  label: {
    marginTop:10
  },
  actionSheetContainer:{
    flexDirection:'column',
    paddingLeft:0,
    paddingRight:0,
  },
  actionSheet:{    
    width: '100%',    
    borderRightWidth:0,    
    borderBottomWidth:1.5,
    paddingLeft:10,        
  },
  actionSheetIcon:{
    color: material.textColor,
    marginRight:-5,
  },
  inputStyle:{
    marginLeft:10,
    marginRight:10,
    fontSize: material.fontSizeBase,
  },
  inputLast: {
    marginTop:2,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
  },

  inputFirst: {
    marginTop: 15,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 20,
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
  }
}