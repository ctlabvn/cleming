import {PRIMARY_COLOR, WARNING_COLOR, ERROR_COLOR, SUCCESS_COLOR} from '~/ui/shared/constants'
export default{
    container: {
        backgroundColor: 'lightgrey',
        height: '100%',
        paddingBottom: 60
    },
    contentContainer: {
        marginTop: 50,
        height: '100%'
    },
    deliveryBlock: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block: {
        flexDirection: 'column',
        // borderStyle: 'dotted',
        // borderBottomWidth: 0.5,
        // borderBottomColor: 'rgba(0,0,0,0.5)',
        marginTop: 5,
        marginBottom: 5
    },
    deliveryCodeBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deliveryCodeWaitingConfirm: {
        color: WARNING_COLOR
    },
    deliveryCodeWaitingDelivery: {
        color: PRIMARY_COLOR
    },
    deliveryCodeSuccess: {
        color: SUCCESS_COLOR
    },
    icon: {
        fontSize: 20,
        marginRight: 5
    },
    avatar: {
        width: 40,
        height: 40
    },
    phoneNumber: {
        color: PRIMARY_COLOR
    },
    phoneIcon: {
        color: PRIMARY_COLOR
    },
    reject: {
        color: 'rgba(0,0,0,0.5)'
    },
    confirm: {
        color: PRIMARY_COLOR
    }
}