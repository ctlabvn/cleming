import material from '~/theme/variables/material.js'
import { Platform } from 'react-native'
export default {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'white'
    },
    inputMoney: {
        flex: 1,
        height: Platform.OS == 'ios' ? 'auto' : 50
    },
    currency: {
        color: material.gray500,
        marginRight: 5,
        fontWeight: 'bold'
    },
    inputStyle: {
        height: 50,
        width: material.deviceWidth - 20,
        backgroundColor: material.gray300,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    dateTimeInput: {
        height: 40,
        width: 100,
        backgroundColor: material.gray300,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    fakeDisable: {
        height: 40,
        width: material.deviceWidth - 20,
        borderWidth: 1,
        borderColor: material.gray300,
        borderRadius: 3,
        backgroundColor: 'white'
    },
    pd10: {
        padding: 10
    },
    mt20: {
        marginTop: 20
    },
    mb20: {
        marginBottom: 20
    },
    primaryButton: {
        backgroundColor: material.primaryColor,
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 15,
        borderRadius: 4
    },
    disableBtn: {
        backgroundColor: material.gray300,
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 15,
        borderRadius: 4
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    rowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    rowSpaceDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
    },
    btnDialog: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    dialogContainer: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        width: material.deviceWidth - 20
    },
    fixBottomButtonBlock: {
        position: 'absolute',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        bottom: 0
    },
    bottomBtn: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgPrimary: {
        backgroundColor: material.primaryColor
    },
    bgWarning: {
        backgroundColor: material.warningColor
    },
    fullScreenPopup: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 17 : 0
    },
    popupHeader: {
        width: '100%',
        height: 50,
        backgroundColor: material.primaryColor,
        flexDirection: 'row',
        alignItems: 'center'
    },
    loadingPlaceHolder: {
        width: 250,
        height: 250,
        backgroundColor: material.gray300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

}