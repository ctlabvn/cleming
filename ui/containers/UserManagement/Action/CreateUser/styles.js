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
    listContent:{
      paddingHorizontal: 10,
    },
    listItem:{                          
        flexDirection: 'row',
        justifyContent: 'space-between',        
        alignItems: 'center',
        paddingBottom: 10,
        minHeight: 40,        
    },
    right: {
        flexDirection:'row',
        justifyContent:'flex-end',
        width: 40,
        marginRight: 10,
        flex: 1,
    },
    left: {        
        color: '#a2a2a2',
        paddingRight: 10,
        flex: 3,
        color: material.gray400
    },
    leftAddressTitleText: {
        fontSize: 15,
        color: material.gray500,
        fontWeight: 'bold',
        marginTop: 10,
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
        position: 'absolute',
        bottom: 0,
        backgroundColor: material.blue400,
        height: 40,
        width: '100%',
        borderRadius: 0,
        flexDirection: 'row',
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
    createPassBlock: {
        marginTop: 10,        
    },
    subText: {
      color: material.gray500,
      marginLeft: 20,
      fontStyle: 'italic'
    },
    closeIcon: {
      color: material.gray500,
      fontSize: 18
    },
    container: {
        paddingBottom: 40,
        backgroundColor: 'white'
    },
    preload: {
      height: 50,
      width: 200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      overflow: 'hidden',              
    }
}