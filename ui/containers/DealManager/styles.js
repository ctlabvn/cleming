import material from '~/theme/variables/material.js'
export default {
  container: {
    backgroundColor: material.backgroundColor1
  },
  bgWhite: {
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  moneyItem: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoItem: {
    width: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  infoNumber: {
    fontSize: 20
  },
  pd15: {
    padding: 15
  },
  pd10: {
    padding: 10
  },
  icon: {
    fontSize: 18
  },
  primary: {
    color: material.primaryColor
  },
  success: {
    color: material.successColor
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  mg5: {
    margin: 5
  },
}
