import material from '~/theme/variables/material.js'
export default {
    modalOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalContainer: {
        // marginTop: '30%',
        width: '90%',
        // minHeight: 200,
        backgroundColor: material.white500,
        borderRadius: 4,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        alignItems: 'center'
    },
    marginRight: {
        marginRight: 10
    },
    reasonText: {
        flexWrap: 'wrap',
        width: '90%'
    },
    gray: {
        color: material.gray600
    },
    content: {
        // justifyContent: 'center'
        // flex: 0,
        // height: 200
    },
    input: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: material.gray300,
        height: 40,
        fontSize: 14
    },
}