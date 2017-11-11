import material from '~/theme/variables/material.js'
export default {
    inputMoney: {
        height: 40,
        width: material.deviceWidth-40,
        borderWidth: 1,
        borderColor: material.gray300,
        borderRadius: 3,
    },
    inputStyle: {
        height: 40,
        width: material.deviceWidth-20,
        borderWidth: 1,
        borderColor: material.gray300,
        borderRadius: 3,
    },
    fakeDisable: {
        height: 40,
        width: material.deviceWidth-20,
        borderWidth: 1,
        borderColor: material.gray300,
        borderRadius: 3,
        backgroundColor: material.gray300
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
        backgroundColor: material.primaryColor
    },
    disableBtn: {
        backgroundColor: material.gray300
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
    }

}