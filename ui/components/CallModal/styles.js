/**
 * Created by vjtc0n on 5/23/17.
 */
import material from '~/theme/variables/material'
export default {
  container: {
    backgroundColor: material.white500,
    width: '80%',
    minHeight: 200,
    overflow: 'hidden',
      borderRadius: 5,
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
    alignItems: 'center',
    paddingVertical: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      height: 45
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