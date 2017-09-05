import material from '~/theme/variables/material'

export default {
    container:{
        flex: 1,
        backgroundColor: material.white500
    },

    content: {
        backgroundColor: material.white500,
        marginLeft: 5,
        marginRight: 5,
        // flex: 1,
    },

    title: {
        alignSelf: 'center',
        marginBottom: 5
    },

    moneyBand: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignItems: 'flex-end',
    },

    icon: {
        fontSize: 24,
        color: material.orange500
    },

    marginTop: {
        marginTop: 10
    },

    marginBottom: {
        marginBottom: 50
    },

    moneyTitle: {
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '100%'
    },

    moneyContent: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    textTitle: {
        color: material.gray600,
    },

    textTitleBlur: {
        color: material.gray300,
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
}