import material from '~/theme/variables/material'
import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
    dropdownContainer:{
        position: 'absolute',
        zIndex: 1000,
        flexDirection:'column',
        width: '100%',
        elevation: 100,
        justifyContent: 'center',
    },
    dropdownHeader:{
        justifyContent:'center',
        backgroundColor: PRIMARY_COLOR,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,        
        height: 50
    },
    dropdownSelectedValue:{
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    dropdownIcon:{
        position: 'absolute',
        right: 0,
        paddingRight: 10,
    },
    dropdownList:{
        backgroundColor: PRIMARY_COLOR,
        width: '100%',        
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
        zIndex: 10
    },
    get backdropClose() {
        return {...this.backdrop, opacity:0}
    }

}