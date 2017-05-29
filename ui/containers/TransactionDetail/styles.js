import { PRIMARY_COLOR, WARNING_COLOR, SUCCESS_COLOR, ERROR_COLOR, BACKGROUND_COLOR_1 } from '~/ui/shared/constants'
export default {
    container: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    transactionBlock: {
        backgroundColor: 'lavender',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    block: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topPart: {
        backgroundColor: BACKGROUND_COLOR_1
    },
    rowPadding: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },

    transactionContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionLabel: {

    },
    transactionID: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 14
    },
    transactionIcon: {
        color: 'limegreen',
    },
    userBlock: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userLabel: {

    },
    userContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        fontWeight: 'bold'
    },
    avatar: {
        width: 40,
        height: 40
    },
    statusBlock: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mark: {

    },
    statusTextWaiting: {
        fontWeight: 'bold',
        color: 'orange'
    },

    bar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    barPart: {
        flexDirection: 'column',
        width: '33.33%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    barOne: {
        backgroundColor: 'blue',
        width: '100%',
        height: 5,
    },
    barTwo: {
        backgroundColor: 'lightblue',
        width: '100%',
        height: 5
    },
    barThree: {
        backgroundColor: 'orange',
        width: '100%',
        height: 5
    },
    barMain: {
        width: '100%',
        height: 5,
        backgroundColor: PRIMARY_COLOR
    },

    arrowDown: {
        width: 0,
        height: 0,
        borderWidth: 5,
        // borderTopColor: 'blue',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        bottom: -5
    },

    arrowUp: {
        width: 0,
        height: 0,
        borderWidth: 5,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        // borderBottomColor: 'lightblue',
        alignSelf: 'center',
        bottom: 5
    },

    barHiddenPartTop: {
        width: 0,
        height: 0,
        borderWidth: 5,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        bottom: -5
    },
    barHiddenPartBottom: {
        width: 0,
        height: 0,
        borderWidth: 5,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        bottom: 5
    },
    invoiceStatusBlock: {
        padding: 10,
        justifyContent: 'flex-end'
    },
    invoiceStatusText: {
        alignSelf: 'flex-end'
    },
    paymenMethodBlock: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paymenMethodLabel: {

    },
    paymenMethodContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    paymenMethod: {
        fontWeight: 'bold'
    },
    borderBlock: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: PRIMARY_COLOR,
        flexDirection: 'column',
        // height: 300
    },

    invoiceBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: -20,
        zIndex: 20
    },
    invoiceLabel: {
        backgroundColor: 'white',
        paddingLeft: 25
    },
    invoice: {
        backgroundColor: 'white',
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        paddingRight: 25
    },
    backgroundTransparent: {
        backgroundColor: 'transparent'
    },
    invoiceDetailBlock: {
        flexDirection: 'column',
        // flexWrap: 'wrap'
    },

    gridItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowSpaceAround: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },

    textInfo: {
        fontWeight: 'bold',
        fontSize: 28
    },
    labelInfo: {
        color: 'grey'
    },
    confirmButton: {
        width: '45%',
        justifyContent: 'center'
    },
    navigateInvoiceBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 20,
        elevation: 5,
        width: '100%'
    },
    buttonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        justifyContent: 'flex-start',
        paddingLeft: 0,
        paddingRight: 0,
    },
    buttonRight: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        justifyContent: 'flex-end',
        paddingLeft: 0,
        paddingRight: 0,
    },
    icon: {
        fontSize: 20,
        marginLeft: 5,
        color: 'grey',
    },
    marginRight: {
        marginRight: 10
    },
    center: {
        justifyContent: 'center'
    },

    success: {
        color: SUCCESS_COLOR
    },
    primary: {
        color: PRIMARY_COLOR
    },
    warning: {
        color: WARNING_COLOR
    },
    disabled: {
        color: '#f4f4f4'
    },
    backgroundBlue: {
        backgroundColor: 'blue'
    },
    backgroundPrimary: {
        backgroundColor: PRIMARY_COLOR
    },
    backgroundWarning: {
        backgroundColor: WARNING_COLOR
    },
    backgroundError: {
        backgroundColor: ERROR_COLOR
    },
    backgroundSuccess: {
        backgroundColor: SUCCESS_COLOR
    },

    borderTopBlue: {
        borderTopColor: 'blue'
    },
    borderBottomPrimary: {
        borderBottomColor: PRIMARY_COLOR
    },
    lineThrough: {
        textDecorationLine: 'line-through'
    },
    btnTxt: {
        fontSize: 12
    },
    feedbackButton: {
        backgroundColor: WARNING_COLOR,
        justifyContent: 'center',
        width: '100%'
    },
    feedbackButtonDisable: {
        justifyContent: 'center',
        width: '100%'
    },
    modalOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalContainer: {
        marginTop: '30%',
        width: '80%',
        minHeight: 200,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
    },

    textPrev: {
        paddingBottom: 3,
    },

    textNext: {
        paddingBottom: 3,
    },
    blockCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30

    },
    content: {
        padding: 10,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentRootChild: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
        height: '100%',
        padding: 10,
        backgroundColor: 'white'
    },
    loadingContainer: { 
        backgroundColor: 'white', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1
    },
    feedbackClmTransaction: {
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
}