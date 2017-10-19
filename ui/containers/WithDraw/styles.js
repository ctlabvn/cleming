import material from '~/theme/variables/material.js'
export default {
    container: {
        width: '100%',
        backgroundColor: material.white500,
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 40
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

    backgroundPrimary: {
        backgroundColor: material.primaryColor
    },
    moneyNumber: {
        fontSize: 24
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

    inputItem: {
        marginBottom: 10,
        backgroundColor: material.gray300,
        width: '100%',
        height: 45,
    },

    inputFieldContainer: {
        width: '60%'
    },

    // icon: {
    //     fontSize: 20,
    //     color: material.white500,
    //     textAlign: 'center'
    // },
    // pd10: {
    //     padding: 10
    // },
    // item: {
    //     backgroundColor: material.gray200,
    //     borderRadius: 5,
    //     margin: 5,
    //     borderColor: 'transparent'
    // },
    // input: {
    //     height: 45,
    //     fontSize: 18,
    // },
}