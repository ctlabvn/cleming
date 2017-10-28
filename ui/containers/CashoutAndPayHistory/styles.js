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
        flex: 1,
    },

    listItemContentMoney: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        minWidth: '20%'
    },

    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: material.gray200,
        paddingHorizontal: 15,
        paddingVertical: 5
    },

}