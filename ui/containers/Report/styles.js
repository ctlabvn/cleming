import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR, BACKGROUND_COLOR_1 } from '~/ui/shared/constants'
export default{
    container: {
        backgroundColor: 'white',
        paddingBottom: 50,
        height: '100%'
    },
    mapPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: PRIMARY_COLOR
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
        backgroundColor: PRIMARY_COLOR
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
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerCustomerText: {
        color: 'white',
    },
    markerMerchant: {
        width: 30,
        height: 30,
        backgroundColor: 'tomato',
        borderRadius: 15,
    },


}