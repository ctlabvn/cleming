/**
 * Created by vjtc0n on 5/8/17.
 */
import material from '~/theme/variables/material.js'
import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window');

export default {
  merchantAddress: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: material.primaryColor
  },
  codeContainer: {
    height: '10%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: material.white500,
    width: '55%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  placeContainer: {
    height: '80%',
    borderWidth: 2,
    borderColor: material.primaryColor,
    marginTop: '7.5%',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: '7%',
    paddingBottom: '3%'
  },
  normalText: {
    color: material.gray600
  },
  boldText: {
    fontWeight: 'bold'
  },
  codeTitleText: {
    marginRight: 2
  },
  codeText: {
    marginLeft: 2,
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  icon: {
    fontSize: 20,
    color: material.gray500
  },
  leftText: {
    marginLeft: 15
  },
  rightText: {
    marginRight: 15
  },
  submitContainer: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: material.white500,
    paddingTop: 7,
    height: '10%'
  },
  submitButton: {
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    borderRadius: 3,
    height: (height > 660) ? '80%' : '60%',
    elevation: 0
  },
  declineButton: {
    backgroundColor: material.gray400
  },
  acceptButton: {
    backgroundColor: material.primaryColor
  },
  declineText: {
    color: material.gray500
  },
  rowPaddingTB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center'
  },
  block: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10
  },

  labelUnderImage: {
    marginTop: 5,
  },
}