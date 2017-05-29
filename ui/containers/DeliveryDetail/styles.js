import {PRIMARY_COLOR, WARNING_COLOR, ERROR_COLOR, SUCCESS_COLOR} from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'white',
        paddingBottom: 100
    },
    content: {

    },
    backgroundPrimary: {
        backgroundColor: PRIMARY_COLOR
    },
    rowPadding: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowPaddingTopLarge: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowPaddingTopMedium: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },

    paddingTopMedium: {
        paddingTop: 3,
    },

    block: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderItem: {
        justifyContent: 'space-between',
        borderBottomColor: 'transparent',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
    },
    cartLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cartContent: {
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    textLeftFlex: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        flex: 1,
    },
    textLeft: {
        textAlign: 'left',
        alignSelf: 'flex-start',
    },

    itemCash: {
    },

    fixBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 5,
        zIndex: 20,
        backgroundColor: 'white'
    },
    line: {
        height: 1,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.5
    }
}