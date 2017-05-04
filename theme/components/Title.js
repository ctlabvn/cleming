import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const titleTheme = {
    // because each left and right have flex 0.5, so the title should be flex 1 mean 50%
    '.full': {
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: variables.deviceWidth/2 + 25,              
    },
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontfamily,
    color: variables.titleFontColor,
    fontWeight: (Platform.OS==='ios') ? '600' : undefined,
    textAlign: 'center'
  };


  return titleTheme;
};
