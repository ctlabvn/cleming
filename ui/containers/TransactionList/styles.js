import material from '~/theme/variables/material'
import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 50
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
    block: {
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
        // borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 5,
    },
    icon: {
        fontSize: 17,
        width: 20,
        color: 'white',
        textAlign: 'center'
    },
    placeholder: {
        width: 30,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
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
    listItem: {
      flexDirection: 'column',
      paddingRight: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      borderBottomWidth: 0,
      paddingTop: 0
    },
    iconBlock: {
        backgroundColor: PRIMARY_COLOR,
        width: 40,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 15,
        marginTop: 4,
    },
    backgroundSuccess: {
        backgroundColor: SUCCESS_COLOR
    },
    backgroundWarning: {
        backgroundColor: WARNING_COLOR
    },
    backgroundError: {
        backgroundColor: ERROR_COLOR
    },
    moneyNumber: {
        fontSize: 20
    }
}