import material from '~/theme/variables/material.js'
const half = 47
const mb = 20
export default {
  fixContainer: {
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
  },
  inputItem: {
      marginBottom: mb,
      backgroundColor: 'white',
  },
  dateInputHalf: {
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderWidth: 1,
    borderRadius: 3,
    width: '100%',
    paddingLeft: 2,
    paddingRight: 2,
  },
  fakeInput: {
    backgroundColor: 'white',
    borderColor: material.gray500,
    borderWidth: 1,
    borderRadius: 3,
    width: '100%',
    paddingLeft: 2,
    paddingRight: 2,
  },
  dateInputHalfOuter: {
    width: half+'%',
    marginBottom: mb,
    height: 40
  },
  halfRow: {
    width: half+'%'
  },
  mb20: {
    marginBottom: mb
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
    alignItems: 'flex-start'
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
  },
}
