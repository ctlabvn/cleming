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
        backgroundColor: 'white',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 3,
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    confirmBtn: {
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmContainer: {
        borderTopWidth: 0.5,
        borderTopColor: 'lightgrey',
        width: '100%',
        justifyContent: 'center',
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
