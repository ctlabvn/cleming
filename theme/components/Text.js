import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const textTheme = {
      fontSize: variables.DefaultFontSize - 3,
      fontFamily: variables.fontFamily,
      color: variables.textColor,
      '.bold': {
        fontWeight: '600',
      },
      '.active': {
        color: variables.tabBarActiveTextColor,
      },
      '.link':{
        color: variables.linkTextColor,
      },
      '.note': {
        color: variables.noteTextColor,
        fontSize: variables.noteFontSize
      },
      '.small': {
        fontSize: variables.btnTextSizeSmall
      },
      '.large': {
        fontSize: variables.btnTextSizeLarge
      },
      '.primary': {
        color: '#00a9d4'
      },
      '.success': {
        color: 'green'
      },
      '.warning': {
        color: 'orange'
      },
      '.error': {
        color: 'red'
      },
      '.white': {
        color: 'white'
      },
      '.light': {
        color: 'lightgrey'
      },
      '.transparent': {
        color: 'transparent'
      },
      '.center': {
        justifyContent: 'center'
      }
  };

  return textTheme;
};
