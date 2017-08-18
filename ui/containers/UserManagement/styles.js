/**
 * Created by vjtc0n on 5/4/17.
 */

import material from '~/theme/variables/material.js'

export default {
    listItem: {
        marginLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        borderBottomWidth: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 0
    },
    listItemPopup:{
        justifyContent: 'space-between',
        width: '100%',
    },
    listEmployeeItem: {
        marginLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        borderBottomWidth: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 0,
        height: 60
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    nameText: {
        fontWeight: '900',
        color: material.gray500
    },
    subTitleText: {
        color: material.gray400,
        height: 20
    },
    topLeftGrid: {
        borderRightWidth: 1,
        borderColor: material.blue400
    },
    bottomLeftGrid: {
        borderRightWidth: 1,
        borderColor: material.blue400,
        width: '100%'
    },
    bottomLeftGridContainer: {
        
    },
    topRightGrid: {
        borderLeftWidth: 1,
        borderColor: material.blue400,
      //backgroundColor: 'red'
    },
    bottomRightGrid: {
        borderLeftWidth: 1,
        borderColor: material.blue400,
        width: '100%'
    },
    bottomRightGridContainer: {
      borderTopWidth: 1,
      borderColor: material.blue400
    },
    addUserButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: material.blue400,
        borderRadius: 0
    },
    addUserText: {
        fontWeight: 'bold',
        color: material.white500
    },
    accountButton: {
        backgroundColor: material.white500,
        paddingLeft: 0,
        borderWidth: 0,
        shadowColor: material.white500,
        padding: 0,
        elevation: 0,
        height: 45
    },
    ownerButton: {
        backgroundColor: material.white500,
        paddingLeft: 0,
        borderWidth: 0,
        shadowColor: material.white500,
        paddingRight: 0,
        height: 40,
        elevation: 0
    },
    modalContainer: {
        // height: 200,
        // width: '90%',
        maxWidth: 300,
        backgroundColor: material.white500,
        borderRadius: 10,
        overflow: 'hidden'
    },
    modalButton: {
        backgroundColor: material.white500,
        paddingLeft: 0,
        borderWidth: 0,
        shadowColor: material.white500,
        paddingRight: 0,
        marginHorizontal: 20,
        elevation: 0
    },
    modalCancelButtonText: {
        color: material.gray500,
        fontWeight: 'bold'
    },
    modalOkButtonText: {
        color: material.blue400,
        fontWeight: 'bold'
    },
    rowCheckBox: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 25
    },
    rowText: {
        // color: material.gray500,
        color: material.gray500,
    }
}