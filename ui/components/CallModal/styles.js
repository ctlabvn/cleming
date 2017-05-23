/**
 * Created by vjtc0n on 5/23/17.
 */
import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
  container: {
    backgroundColor: 'white',
    width: '80%',
    height: 130,
    borderRadius: 5,
    overflow: 'hidden'
  },
  text: {
    alignSelf: 'center'
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    backgroundColor: '#b5b5b5',
    alignSelf: 'flex-end',
    marginRight: 2
  },
  rightButton: {
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'flex-start',
    marginLeft: 2
  }
}