import material from '~/theme/variables/material'
export default{
    container: {
        backgroundColor: material.white500,
        height: '100%'
    },
    mapPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: material.primaryColor
    },
    graphBlock: {
        flexDirection: 'column'
    },
    graphRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    graphDraw: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    graphDrawPart: {
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backgroundBlue: {
        backgroundColor: '#0257e0'
    },
    bar: {
        height: 5,
        width: '100%'
    },
    backgroundPrimary: {
        backgroundColor: material.primaryColor
    },
    backgroundGrey: {
        backgroundColor: 'lightgrey'
    },
    graphLabel: {
        width: 50
    },
    rightText: {
        textAlign: 'right',
        textAlignVertical: 'top'
    },
    textCenter: {
        textAlign: 'center',
        textAlignVertical: 'top'
    },
    textCenterBottom: {
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    markerCustomer: {
        width: 60,
        height: 60,
        backgroundColor: material.primaryColor,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerCustomerText: {
        color: material.white500,
    },
    markerMerchant: {
        width: 30,
        height: 30,
        backgroundColor: material.orange500,
        borderRadius: 15,
    },


}