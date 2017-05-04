import material from '~/theme/variables/material'
import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '100%'
    },
    picker: {
        color: 'white',
        backgroundColor: PRIMARY_COLOR
    },
    pickerItem: {
        color: 'white',
        backgroundColor: PRIMARY_COLOR
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'space-between'
    },
    tab: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    
    },
    tabActive: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    tabTextActive: {
        color: 'white',
        marginRight: 3,
        fontWeight: '900',
    

    },
    tabTextDeactive: {
        color: 'rgba(255,255,255,0.5)',
        marginRight: 3,
        fontWeight: '100'
    },
    tabNumberContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabNumberActive: {
        color: 'white',
        fontSize: 10
    },
    tabNumberDeactive: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10
    },  
    filterByTransactionType: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
        justifyContent: 'space-between',
        padding: 10
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
    }



}