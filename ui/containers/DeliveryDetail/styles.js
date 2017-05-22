import {PRIMARY_COLOR, WARNING_COLOR, ERROR_COLOR, SUCCESS_COLOR} from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'white'
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
        flexDirection: 'row'
    },
    orderItem: {
        justifyContent: 'space-between', 
        borderBottomColor: 'transparent',
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10
    }
}