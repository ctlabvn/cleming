import material from '~/theme/variables/material.js'
export default {
    container: {
        backgroundColor: 'white'
    },

    listItem: {
        padding: 0,
        marginRight: -10,
        marginTop: -10,
        marginBottom: -10
    },

    listItemContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7
    },

    listItemContentTime: {
        alignSelf: 'flex-start'
    },

    listItemContentBalanceName: {
        maxWidth: '80%'
    },

    listItemContentMoney: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginRight: 10,
    },

    title: {
        backgroundColor: material.gray300,
        padding: 15
    },

}