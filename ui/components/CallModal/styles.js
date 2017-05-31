/**
 * Created by vjtc0n on 5/23/17.
 */
import material from '~/theme/variables/material'
export default {
  container: {
    backgroundColor: material.white500,
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
    backgroundColor: material.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    backgroundColor: material.gray400,
    alignSelf: 'flex-end',
    marginRight: 2
  },
  rightButton: {
    backgroundColor: material.primaryColor,
    alignSelf: 'flex-start',
    marginLeft: 2
  }
}