import material from '~/theme/variables/material'

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
    // borderBottomWidth: 0,
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderWidth: 1,
    borderRadius: 3,
  },
  input: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    height:'100%',
    fontSize: material.btnTextSize,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  },
  textInput: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: material.btnTextSize,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderWidth: 1,
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
