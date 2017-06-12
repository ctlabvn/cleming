import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';


export default (variables = variable) => {
  const checkBoxTheme = {
      '.checked': {
        'NativeBase.Icon': {
          color: variables.blue400,
        },
        'NativeBase.IconNB': {
          color: variables.blue400,
        },        
      },
      '.large': {        
        width: variables.checkboxSizeLarge,
        height: variables.checkboxSizeLarge,        
      },
      'NativeBase.Icon': {
        color: variables.gray400,
        lineHeight: variables.CheckboxIconSize,
        marginTop: variables.CheckboxIconMarginTop,
        fontSize: variables.CheckboxFontSize,        
      },
      'NativeBase.IconNB': {
        color: variables.gray400,
        lineHeight: variables.CheckboxIconSize,
        marginTop: variables.CheckboxIconMarginTop,
        fontSize: variables.CheckboxFontSize,        
      },            
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,      
      width: variables.checkboxSize,
      height: variables.checkboxSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
  };


  return checkBoxTheme;
};
