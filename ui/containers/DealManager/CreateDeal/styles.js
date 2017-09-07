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
      marginBottom: 20,
      backgroundColor: 'white',
  },
  mb20: {
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  rowFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
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
