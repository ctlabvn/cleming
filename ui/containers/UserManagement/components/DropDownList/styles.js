/**
 * Created by vjtc0n on 5/12/17.
 */
import material from '~/theme/variables/material'
import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
  dropdownContainer:{
    position: 'absolute',
    flexDirection:'column',
    width: '100%',
    elevation: 0,
    borderRadius: 5,
    overflow: 'hidden',
    zIndex: 100
  },
  dropdownHeader:{
    justifyContent:'flex-start',
    backgroundColor: "#d9d9d9",
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 0,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownSelectedValue:{
    color: '#7e7e7e',
  },
  dropdownIcon:{
    right: 0,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  dropdownList:{
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    marginTop:-2,
    zIndex: 1000,
  },
  dropdownListItem:{
    borderBottomWidth: 0,
    justifyContent: 'center',
  },
  dropdownListItemText:{
    color: 'white',
    fontWeight: '100'
  },
  content:{
    position: 'absolute',
    top: 75
  },
  backdrop:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000
  },
  get backdropClose() {
    return {...this.backdrop, opacity:0}
  }
  
}