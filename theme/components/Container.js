import variable from './../variables/platform';

export default (variables = variable) => {
  const theme = {
    flex: 1,
    height: (variables.platform === 'ios') ? variables.deviceHeight : variables.deviceHeight - 20,    
    backgroundColor: variables.backgroundColor,        
  };

  return theme;
};
