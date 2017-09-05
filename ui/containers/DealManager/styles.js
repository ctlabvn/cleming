import material from '~/theme/variables/material.js'
import {Platform} from 'react-native'
export default {
  container: {
    backgroundColor: material.backgroundColor1,
  },
  subContainer: {
    padding: 10
  },
  bgWhite: {
    backgroundColor: 'white'
  },
  cardBlock: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 3
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
  pd5: {
    padding: 5
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
  mr3: {
    marginRight: 3
  },
  mg10: {
    margin: 10
  },
  pb10: {
    paddingBottom: 10
  },
  dealImage: {
    height: 70,
    width: 100,
    resizeMode: 'cover',
    marginRight: 20
  },
  discountNumber: {
    paddingLeft: 15,
    borderLeftWidth: 1,
    borderColor: material.gray500
  },
  dealRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dealTransactionIcon: {
    marginRight: 15
  },
  dealContainer: {
    marginBottom: 15
  },
  mb10: {
    marginBottom: 10
  },
  fabBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: material.primaryColor,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  fabBtnText: {
    textAlign: 'center',
    textAlignVertical: 'top',
    lineHeight: 20,
    fontSize: 20
  }
}
