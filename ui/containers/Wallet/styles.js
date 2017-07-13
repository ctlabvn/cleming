import material from '~/theme/variables/material.js'
export default {
    container: {
        width: '100%',
        backgroundColor: material.white500,
        flexDirection: 'column',
        height: '100%',
        // paddingBottom:rr 50
    },
    content: {
        backgroundColor: material.gray300
    },

    block: {
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    blockConfirmed: {
        flexDirection: 'column',
        backgroundColor: material.backgroundColor1,
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
        padding: 5,
    },
    icon: {
        fontSize: 20,
        color: material.white500,
        textAlign: 'center'
    },
    iconLarge: {
        fontSize: 25,
        color: material.gray500,
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
    backgroundPrimary: {
        backgroundColor: material.primaryColor
    },
    moneyNumber: {
        fontSize: 20
    },
    transactionCode: {
        fontSize: 20
    },
    button: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    borderWhite: {
        borderColor: 'white'
    },
    mr3: {
        marginRight: 3
    },
    borderBottomPrimary: {
        borderBottomColor: material.primaryColor,
        borderBottomWidth: 1,
    },
    pd10: {
        padding: 10
    }

}