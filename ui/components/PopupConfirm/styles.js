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
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // padding: 10,
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
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'transparent'
    },
    confirmContainer: {
        borderTopWidth: 0.5,
        borderTopColor: 'lightgrey',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textContanter: {
        marginBottom: 15,
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        textAlign: 'center'
    },
    header: {
        padding: 10,
        backgroundColor: material.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
}