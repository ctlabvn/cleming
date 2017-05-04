import {PRIMARY_COLOR} from '~/ui/shared/constants'
export default{
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: '100%'
    },
    contentContainer: {
        marginTop: 50
    },
    deliveryBlock: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block: {
        flexDirection: 'column',
        borderStyle: 'dotted',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginTop: 5,
        marginBottom: 5
    },
    deliveryCodeBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deliveryCodeWaitingConfirm: {
        color: 'orange'
    },
    deliveryCodeWaitingDelivery: {
        color: PRIMARY_COLOR
    },
    deliveryCodeSuccess: {
        color: 'green'
    },

    avatar: {
        width: 40,
        height: 40
    },
    phoneNumber: {
        color: PRIMARY_COLOR
    },
    reject: {
        color: 'rgba(0,0,0,0.5)'
    },
    confirm: {
        color: PRIMARY_COLOR
    }
}