import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';


export default (variables = variable) => {
  const checkBoxTheme = {
      '.checked': {
        'NativeBase.Icon': {
          color: variables.checkboxTickColor,
        },
        'NativeBase.IconNB': {
          color: variables.checkboxTickColor,
        },
      },
      '.large': {
        borderRadius: variables.checkboxSizeLarge / 2,
        width: variables.checkboxSizeLarge,
        height: variables.checkboxSizeLarge,
        borderWidth: variables.CheckboxBorderWidth * 2,
      },
      '.square': {
        borderRadius: 0,
      },
      'NativeBase.Icon': {
        color: 'transparent',
        lineHeight: variables.CheckboxIconSize,
        marginTop: variables.CheckboxIconMarginTop,
        fontSize: variables.CheckboxFontSize,
      },
      'NativeBase.IconNB': {
        color: 'transparent',
        lineHeight: variables.CheckboxIconSize,
        marginTop: variables.CheckboxIconMarginTop,
        fontSize: variables.CheckboxFontSize,
      },
      borderRadius: variables.CheckboxRadius,
      borderColor: '#ccc',
      overflow: 'hidden',
      width: variables.checkboxSize,
      height: variables.checkboxSize,
      borderWidth: variables.CheckboxBorderWidth,
      paddingLeft: variables.CheckboxPaddingLeft - 1,
      paddingBottom: variables.CheckboxPaddingBottom,
      left: 10,
  };


  return checkBoxTheme;
};
