import material from '~/theme/variables/material'
export default {
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        padding: 10
    },
    item: {
        width: '100%',
        backgroundColor: material.gray200,
        borderRadius: 2,
        borderColor: 'transparent'
    },
    input: { 
        // width: '100%', 
        height: 50, 
        fontSize: 18,
    },
    okBtn: {
        backgroundColor: material.primaryColor,
        width: material.deviceWidth,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        borderRadius: 0
    },
    row: {
        marginBottom: 20
    },
    icon: {
        fontSize: 25,
        color: material.gray600
    }
}