/**
 * Created by vjtc0n on 5/5/17.
 */
import material from '~/theme/variables/material.js'

export default {
    inputField: {
        borderRadius: 5,
        // backgroundColor: '#d9d9d9',
        backgroundColor: material.gray300,
        height: 48,
        marginTop: 0
    },
    inputContainer: {
        marginBottom: 5,
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        paddingTop: 0,
        overflow: 'hidden',
    },
    inputIcon: {
        fontSize: 20,
        color: material.gray500
    },
    inputText: {
      color: material.gray500,
      top: 0
    },
    listItem:{
        marginLeft:10,
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        height:40,
        borderBottomWidth: 0,
        paddingBottom: 10
    },
    right: {
        flexDirection:'row',
        justifyContent:'flex-end',
        flex:1,
        marginRight: 10
    },
    left: {
        flex: 1,
        // color: '#a2a2a2',
        color: material.gray400
    },
    leftAddressTitleText: {
        fontSize: 15,
        color: material.gray500,
        fontWeight: 'bold',
    },
    rightAddressTitleText: {
        fontSize: 15,
        color: material.blue400
    },
    createPasswordButton: {
        backgroundColor: material.blue400,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0
    },
    createPasswordButtonText: {
        color: material.white500
    },
    passwordText: {
        color: material.blue400,
        fontSize: 24,
        fontWeight: 'bold'
    },
    passwordTextWarning: {
        color: material.blue400,
        fontSize: 14
    },
    copyText: {
        color: material.blue400,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: material.blue400,
        alignSelf: 'flex-end',
        width: '100%',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyIcon: {
        color: material.blue400,
        marginRight: 5
    },
    modalContainer: {
        width: '90%',
        backgroundColor: material.white500,
        borderRadius: 10,
        overflow: 'hidden',
        minHeight: 50,
        justifyContent: 'center'
    },
    absoluteContainer: {
      bottom: 0,
      left: 0,
      width: '100%',
      height: 170,
      backgroundColor: material.white500
    },
    subText: {
      color: material.gray500,
      marginLeft: 20,
      fontStyle: 'italic'
    },
    closeIcon: {
      color: material.gray500,
      fontSize: 18
    }
}