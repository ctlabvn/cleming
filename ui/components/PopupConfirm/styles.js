import material from '~/theme/variables/material'
export default {
    modalOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: 200,
        borderRadius: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    btnRight: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    confirmContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        paddingRight: 10,
    },
    textContanter: {
        marginBottom: 15,
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        padding: 20,
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