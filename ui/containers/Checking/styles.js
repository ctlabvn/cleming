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
        // flex: 1,
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

    itemContent: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 7,
        paddingRight: 20,
    },

    icon: {
        color: material.orange500,
        fontSize: 32,
        padding: 25
    },

    moneyTitle: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        marginTop: 25,
        marginBottom: 5,
        width: '100%'
    },

    moneyContent: {
        justifyContent: 'space-between'
    },

    moneyNoIcon: {marginRight: 20},

    fixButtonBlock: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        // borderTopWidth: 1,
        bottom: 0
    },
    buttonFeedback: {
        width: '50%',
        borderRadius: 0,
        justifyContent: 'center',
        height: 50
    },
    backgroundLightGray: {
        backgroundColor: material.gray300
    },
}