/**
 * Created by vjtc0n on 5/8/17.
 */
import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR } from '~/ui/shared/constants'
import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window');

export default {
  merchantAddress: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR
  },
  codeContainer: {
    height: '10%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '55%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  placeContainer: {
    height: '80%',
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    marginTop: '7.5%',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: '7%',
    paddingBottom: '3%'
  },
  normalText: {
    color: '#595959'
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
    color: 'grey'
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
    backgroundColor: 'white',
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
    backgroundColor: '#d9d9d9'
  },
  acceptButton: {
    backgroundColor: PRIMARY_COLOR
  },
  declineText: {
    color: '#7e7e7e'
  }
}