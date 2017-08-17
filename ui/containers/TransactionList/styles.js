import material from '~/theme/variables/material.js'
export default {
    container: {
        width: '100%',
        backgroundColor: material.white500,
        flexDirection: 'column',
        height: '100%',
        // paddingBottom:rr 50
    },
    picker: {
        color: material.white500,
        backgroundColor: material.primaryColor
    },
    pickerItem: {
        color: material.white500,
        backgroundColor: material.primaryColor
    },
    filterByTransactionType: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: material.primaryColor,
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
        color: material.primaryColor,
        fontWeight: 'bold',
        marginRight: 10,
    },
    transactionTypeIcon: {
        color: material.primaryColor,
        marginRight: 7,
        fontSize: 20
    },
    block: {
        flexDirection: 'column',
        // backgroundColor: material.white500,
        width: '100%',
        // borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    blockConfirmed: {
        flexDirection: 'column',
        // backgroundColor: material.backgroundColor1,
        width: '100%',
        // borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    icon: {
        fontSize: 30,
        // width: 20,
        color: material.white500,
        textAlign: 'center'
    },
    placeholder: {
        width: 30,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    success: {
        color: material.successColor
    },
    reject: {
        color: material.errorColor
    },
    primary: {
        color: material.primaryColor
    },
    warning: {
        color: material.warningColor
    },
    notPayIcon: {
        color: material.primaryColor
    },
    smallText: {
        fontSize: 13,
    },
    readIndicator: {
        backgroundColor: material.primaryColor,
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
    listItemRead: {
      flexDirection: 'column',
      paddingRight: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      borderBottomWidth: 0,
      paddingTop: 0,
      backgroundColor: material.gray300
    },
    iconBlock: {
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
        backgroundColor: material.successColor
    },
    backgroundWarning: {
        backgroundColor: material.warningColor
    },
    backgroundError: {
        backgroundColor: material.errorColor
    },
    moneyNumber: {
        fontSize: 20
    },
    moneyNumberClingme: {
        // fontSize: 24
    },
    transactionCodeClingme: {
        // fontSize: 16
    },
    button: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    }

}