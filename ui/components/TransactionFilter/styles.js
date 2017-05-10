import material from '~/theme/variables/material'
import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    picker: {
        color: 'white',
        backgroundColor: PRIMARY_COLOR
    },
    pickerItem: {
        color: 'white',
        backgroundColor: PRIMARY_COLOR
    },
    filterByTransactionType: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,

    },
    numberRight: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginRight: 10,
    },
    transactionTypeIcon: {
        color: PRIMARY_COLOR,
        marginRight: 7,
        fontSize: 20
    },
    transactionCode: {
        fontWeight: 'bold'
    },
    block: {
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
        // borderRadius: 3,
        padding: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        fontSize: 17,
        width: 20,
        marginRight: 10,
        color: 'grey'
    },
    placeholder: {
        width: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    processing: {
        color: WARNING_COLOR
    },
    success: {
        color: SUCCESS_COLOR
    },
    reject: {
        color: ERROR_COLOR
    },
    notPayIcon: {
        color: PRIMARY_COLOR
    },
    smallText: {
        fontSize: 13,
    },
    readIndicator: {
        backgroundColor: PRIMARY_COLOR,
        width: 7,
        height: 7,
        borderRadius: 7
    },
    listItem: {flexDirection: 'column', paddingRight: 0, paddingBottom: 0, marginLeft: 0, marginRight: 0, borderBottomWidth: 0, paddingTop: 0},
}