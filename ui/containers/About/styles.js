import material from '~/theme/variables/material'

export default {
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: material.white500,
    },

    logoIcon:{
        color: material.red500,
        fontSize: 60,
        alignSelf: 'center',
        marginTop: 25,
    },

    logoIconDeep:{
        color: material.gray300,
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    textTitle: {
        fontWeight: 'bold',
        color: material.gray600,
        marginTop: 25,
    },

    textContent: {
        marginTop: 10,
        marginBottom: 0,
        color: material.gray600,
        fontWeight: 'normal',
    },

    textBlue: {
        color: material.blue500,
    }
}