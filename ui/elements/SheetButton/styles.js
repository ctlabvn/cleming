import material from '~/theme/variables/material'

export default {
  container: {
    borderRightWidth: 1.5,
    borderRadius:0,
    height:material.inputHeightBase,
    paddingLeft:5,
    borderColor:'#eaeaea',
  },
  label:{
    color: material.noteTextColor,
  },
  value: {
    color:material.textColor,
    marginLeft:5,  
    fontSize: material.fontSizeBase,
  },
  icon: {
    marginRight:-10,   
    color:material.noteTextColor, 
  }
}