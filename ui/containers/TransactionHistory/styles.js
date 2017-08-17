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
        justifyContent: 'space-between',
    },

    listItem: {
        paddingRight: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderBottomWidth: 0,
        paddingTop: 0,
    },

    subRow: {paddingVertical: 5, justifyContent: 'space-between'},

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

    button: {
        flex: 1,
        alignSelf:'center',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: material.blue400,
        paddingHorizontal: 10
    },
}