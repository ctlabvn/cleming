import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR, BACKGROUND_COLOR_1 } from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: BACKGROUND_COLOR_1,
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
        alignItems: 'center',
        width: '100%'
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
        // justifyContent: 'center',
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
        marginRight: 10
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
    },
    detailButton: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        height: 250,
        paddingBottom: 0,
        borderWidth: 0,
        zIndex: 0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: 'white',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        alignItems: 'stretch',
        elevation: 0
    },

    labelUnderImage: {
        color: 'black',
        marginTop: 5,
    },
    listItem: {
        flexDirection: 'column',
        paddingRight: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderBottomWidth: 0,
        paddingTop: 0,
        backgroundColor: 'white',
        borderRadius: 3,
        marginBottom: 10
    },
  
}