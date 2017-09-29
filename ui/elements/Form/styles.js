import material from '~/theme/variables/material'
import {Platform} from 'react-native'
export default {

  item: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 0,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 40,
    borderBottomWidth: 0,
  },


  item2: {
    // borderRadius: 5,
    // marginLeft: 0,
    // marginTop: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // width: '100%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    height: (Platform.OS === 'ios' ? 40 : 'auto'),
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderRadius: 3,
    borderWidth: 1,
    // padding: 10
  },
  input: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    height:'100%',
    fontSize: material.btnTextSize,
    borderWidth: 0,
    borderColor: 'transparent'
  },
  textInput: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: material.btnTextSize,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderWidth: 1,
    height: (Platform.OS === 'ios' ? 150 : 'auto'),
    padding: 5
  },
  inputIcon: {
    paddingRight:0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: -10,
  },
  label: {

  },
}
