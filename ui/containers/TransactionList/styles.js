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
        justifyContent: 'flex-start'
    },
    numberRight: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    },
    transactionTypeIcon: {
        color: PRIMARY_COLOR,
        marginRight: 3
    },
    transactionCode: {
        fontWeight: 'bold'
    },
    block: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 3,
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
        width: 20
    },
    placeholder: {
        width: 20        
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
    }




}