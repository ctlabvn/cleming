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
    },

    moneyBandContainer: {
        paddingBottom: 10,
        paddingHorizontal: 20
    },

    moneyBand: {
        justifyContent: 'space-between',
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

    subRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    icon: {
        color: material.orange500,
        fontSize: 32,
        padding: 25
    },

    itemIcon: {
        color: material.orange500,
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 12
    },

    item: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'flex-start'
    },

    center: {
        alignItems: 'center'
    },

    textPlaceTitle: {
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'center'
    },

    numberPlaceTitle: {
        marginBottom: 7,
        alignSelf: 'center'
    },

    button: {
        flex: 1,
        alignSelf:'center',
        marginBottom: 20,
        paddingHorizontal: 10
    },

    spaceView: {
        height: 50
    },

    listViewExtend: {
        flex: 1
    },

    groupRow: {
        paddingTop: 10,
        flex: 1
    },
}