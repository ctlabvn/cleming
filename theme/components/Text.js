import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';
import material from '~/theme/variables/material'

export default (variables = variable) => {
  const textTheme = {
      fontSize: variables.DefaultFontSize - 3,
      fontFamily: variables.fontFamily,
      color: variables.textColor,
      '.bold': {
        fontWeight: '600',
      },
      '.superBold': {
        fontWeight: '800',
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
      '.tiny': {
        fontSize: material.textSizeTiny
      },
      '.small': {
        fontSize: material.textSizeSmall
      },
      '.medium': {
          fontSize: material.textSizeMedium
      },
      '.largeLight': {
          fontSize: material.textSizelargeLight
      },
      '.large': {
          fontSize: material.textSizelarge
      },
      '.big': {
          fontSize: material.textSizeBig
      },
      '.giant': {
          fontSize: material.textSizeGiant
      },
      '.primary': {
        color: material.primaryColor
      },
      '.secondary': {
          color: material.secondaryColor
      },
      '.success': {
        color: material.successColor
      },
      '.warning': {
        color: material.orange500
      },
      '.error': {
        color: material.red500
      },
      '.white': {
        color: material.white500
      },
      '.light': {
        color: material.gray300
      },
      '.gray': {
          color: material.gray500
      },
      '.grayDark': {
          color: material.gray600
      },
      '.transparent': {
        color: 'transparent'
      },
      '.center': {
        justifyContent: 'center'
      },
      '.grayDisable': {
        color: '#b3b3b3'
      }
  };

  return textTheme;
};
