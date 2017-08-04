import material from '~/theme/variables/material'
export default {

    container: {
        margin: 10, 
        backgroundColor: material.gray300,
        borderRadius: 4
    },
    dropdown:{
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',     
        width: '100%',
        margin: 10
    },
    dropdownSelectedValue:{
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    dropdownIcon:{
        position: 'absolute',
        right: 0,
    },
    icon: {
        color: material.gray500,
        fontSize: 20,
        marginRight: 3
    },
    selectContainer: {
        width: '100%'
    },


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
        padding: 10,
        borderRadius: 3
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
    },
    input: { 
        flex: 1,
        borderBottomWidth: 0.5, 
        borderBottomColor: material.gray300, 
        height: 40, 
        fontSize: 14
    },
    listItem: {
        width: '100%',
        borderColor: material.gray300
    },
    closeBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: material.gray300,
        borderTopWidth: 0.5,
        width: '100%',
        marginTop: 10
    }
}