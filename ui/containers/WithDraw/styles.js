import material from '~/theme/variables/material.js'
export default {
    container: {
        width: '100%',
        backgroundColor: material.white500,
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 40
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
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
    success: {
        color: material.successColor
    },
    primary: {
        color: material.primaryColor
    },
    smallText: {
        fontSize: 13,
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
    backgroundPrimary: {
        backgroundColor: material.primaryColor
    },
    moneyNumber: {
        fontSize: 24
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
    },
    item: {
        backgroundColor: material.gray200,
        borderRadius: 5,
        margin: 5,
        borderColor: 'transparent'
    },
    input: {
        height: 45,
        fontSize: 18,
    },
    bankLogo: {
        width: 70,
        height: 30,
        resizeMode: 'cover',
    },
    bankLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5,
        borderColor: material.gray300,
        borderWidth: 1,
        height: 50,
        margin: 5,
        marginBottom: 10,
    },
    okBtn: {
        backgroundColor: material.primaryColor,
        height: 50,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    },
    form: {
        padding: 10
    },
    inputItem: {
        marginBottom: 10,
        backgroundColor: material.gray300,
        width: '100%',
    },
    inputItem1: {
        marginBottom: 10,
        backgroundColor: material.gray300,
        width: '60%',
    },
    rowInput: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputFieldContainer: {
        width: '60%'
    }
}