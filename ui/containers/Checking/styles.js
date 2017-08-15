import material from '~/theme/variables/material'

export default {
    container:{
        flex: 1,
        backgroundColor: material.white500
    },

    content: {
        backgroundColor: material.white500,
        marginLeft: 15,
        marginRight: 15,
    },

    moneyBand: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignItems: 'flex-end',
    },

    listItem: {
        paddingRight: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderBottomWidth: 0,
        paddingTop: 0,
    },

    row: {
        flexDirection: 'row'
    },

    itemContent: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 7,
        paddingRight: 20,
    },

    subRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },

    icon: {
        color: material.orange500,
        fontSize: 32,
        padding: 25
    },

    revenueProcessing: {
        color: material.orange500,
    },

    revenueDone: {
        color: material.green500,
    },
}