import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'lightgrey',
        height: '100%',
        paddingBottom: 10
    },
    content: {
        padding: 10,
        height: '100%'
    },
    rowPadding: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowPaddingTB: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    rowRight: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    block: {
        // padding: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 3,
        marginBottom: 10
    },
    center: {
        justifyContent: 'center'
    },
    merchantAddress: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR
    },
    icon: {
        fontSize: 20,
        color: 'grey'
    },
    iconLeft: {
        marginRight: 3
    },
    iconRight: {
        marginLeft: 3
    },
    primary: {
        color: PRIMARY_COLOR
    },
    success: {
        color: SUCCESS_COLOR
    },
    button: {
        justifyContent: 'center',
        width: '40%',
    }
}