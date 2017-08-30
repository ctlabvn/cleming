import material from '~/theme/variables/material'
export default {
    modalOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        // marginTop: '30%',
        width: '80%',
        minHeight: 200,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    confirmBtn: {
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLeft: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: 'lightgrey',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 0,

    },
    btnRight: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'transparent',
    },
    confirmContainer: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textContanter: {
        marginBottom: 15,
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    text: {
        textAlign: 'center'
    },

}