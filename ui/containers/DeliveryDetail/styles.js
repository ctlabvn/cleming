import {PRIMARY_COLOR, WARNING_COLOR, ERROR_COLOR, SUCCESS_COLOR} from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'white',
    },
    content: {

    },
    backgroundPrimary: {
        backgroundColor: PRIMARY_COLOR
    },
    rowPadding: {
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderItem: {
        justifyContent: 'space-between', 
        borderBottomColor: 'transparent',
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10
    }
}