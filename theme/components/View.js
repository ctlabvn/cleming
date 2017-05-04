import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const viewTheme = {
      '.padder': {
        padding: variables.contentPadding/2,
      },   
      '.rounded': {
        borderRadius: 4,
      },   
      '.row': {
        flexDirection: 'row',
        alignItems:'center',
      },
      '.full':{
        justifyContent: 'space-between',
        width: '100%',
      },
      '.regit': {                
        overflow: 'hidden',
        'NativeBase.ListItem': {          
          borderColor:'#cccccc',
          justifyContent:'space-between',
          height: 60,
          marginLeft:0,
          marginRight:0,
          paddingLeft:20,
          paddingRight:20,
          borderBottomWidth:0.5,    

          'NativeBase.Icon':{      
            marginRight: -10,                  
          },
          'NativeBase.Text':{
            width: variable.deviceWidth - 140,
            fontSize:14,
          },
          '.last': {
            borderBottomWidth:null,
          }            
        },

        backgroundColor:'#fff',
        borderRadius:4,                                  
      },
  };


  return viewTheme;
};
