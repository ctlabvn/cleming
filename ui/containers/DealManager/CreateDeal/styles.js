import material from '~/theme/variables/material.js'
export default {
  fixContainer: {
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
  },
  inputItem: {
      marginBottom: 10,
      backgroundColor: 'white',
      borderColor: material.gray500,
      borderWidth: 1,
      borderRadius: 3
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: material.gray500
  },
  bottomButton: {
    width: '100%',
    backgroundColor: material.primaryColor,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
}
