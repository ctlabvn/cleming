import material from '~/theme/variables/material.js'
export default{
    container: {
        paddingTop: 50,
        backgroundColor: material.gray200 
    },
    contentContainer: {
      padding: 0,
      marginLeft: 10,
      marginRight: 10,
    },
    contentContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    deliveryBlock: {
        flexDirection: 'column',
        backgroundColor: material.white500,
        borderRadius: 2,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    deliveryBlockCacel: {
        flexDirection: 'column',
        backgroundColor: material.gray400,
        borderRadius: 2,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    block: {
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5
    },
    subBlock: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textLeft: {
        alignSelf: 'flex-start',
        textAlign: 'left'
    },
    deliveryCodeBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deliveryCodeWaitingConfirm: {
        color: material.warningColor
    },
    deliveryCodeWaitingDelivery: {
        color: material.primaryColor
    },
    deliveryCodeSuccess: {
        color: material.successColor
    },
    grey: {
        color: material.gray600
    },
    icon: {
        fontSize: 20,
        marginRight: 5,
        color: material.gray600
    },
    avatar: {
        width: 40,
        height: 40
    },
    phoneNumber: {
        color: material.primaryColor
    },
    phoneIcon: {
        color: material.primaryColor
    },
    reject: {
        color: 'rgba(0,0,0,0.5)'
    },
    confirm: {
        color: material.primaryColor
    },
    time: {
        marginRight: 5
    }
}