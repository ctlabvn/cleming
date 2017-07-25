import material from '~/theme/variables/material'

export default {
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: material.white500,
    },

    indicatorIcon:{
        color: material.blue600,
        fontSize: 15,
        marginTop: 3,
        marginBottom: 7,
    },

    iconContainer: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
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

    logoIconFloat:{
        color: material.green400,
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10,
    },

    textTitle: {
        fontWeight: 'bold',
        color: material.gray600,
        marginTop: 25,
    },

    textContent: {
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 3,
        color: material.gray600,
        fontWeight: 'normal',
    },

    textSubContent: {
        marginTop: 10,
        marginBottom: 0,
        color: material.gray600,
        fontWeight: 'normal',
        flex: 1,
        marginLeft: 5,
    },

    textBlue: {
        color: material.blue500,
    },
    textBlueDark: {
        color: material.blue600,
    },
    textRed: {
        color: material.red500,
    },

    row: {
      flexDirection: 'row',
        alignItems: 'flex-start',
    },
}