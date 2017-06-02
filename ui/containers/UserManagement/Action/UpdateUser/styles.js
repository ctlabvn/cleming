/**
 * Created by vjtc0n on 5/5/17.
 */
import material from '~/theme/variables/material.js'
export default {
    inputContainer: {
        marginBottom: 15
    },
    inputField: {
        borderRadius: 5,
        backgroundColor: material.gray300,
        height: 50
    },
    inputIcon: {
        fontSize: 20,
        color: material.gray500
    },
    updatePasswordButton: {
        backgroundColor: material.blue400,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    updatePasswordButtonText: {
        color: material.white500
    },
    photoIcon:{
        position:'absolute',
        bottom:10,
        right:0,
    },
    avatarContainer:{
        alignSelf: 'center',
        zIndex:10,
        marginTop: 20
    },
    avatar: {
      width: 120,
      height: 120,
      backgroundColor: material.gray300,
      borderRadius: 60
    },
    changePasswordText: {
      color: material.blue400,
      alignSelf: 'center'
    }
}