import material from '~/theme/variables/material'

export default {
    container: {
        width: '100%',
        backgroundColor: material.white500,
        flexDirection: 'column',
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
        marginRight: 15,
    },
    transactionTypeIcon: {
        color: material.primaryColor,
        marginRight: 7,
        fontSize: 20
    },
    transactionCode: {
        fontWeight: 'bold'
    },
    block: {
        flexDirection: 'column',
        backgroundColor: material.white500,
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
        color: material.warningColor
    },
    success: {
        color: material.successColor
    },
    reject: {
        color: material.errorColor
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
    listItem: {flexDirection: 'column', paddingRight: 0, paddingBottom: 0, marginLeft: 0, marginRight: 0, borderBottomWidth: 0, paddingTop: 0},
}