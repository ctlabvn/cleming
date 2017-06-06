import material from '~/theme/variables/material.js'
export default {
    container: {
        backgroundColor: material.backgroundColor1,
        height: '100%',
        paddingBottom: 10
    },
    content: {
        padding: 10,
        height: '100%'
    },
    rowPadding: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    rowPaddingTB: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    rowRight: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'center',
        padding: 10
    },
    block: {
        // padding: 10,
        backgroundColor: material.white500,
        flexDirection: 'column',
        borderRadius: 3,
        marginBottom: 10
    },
    center: {
        justifyContent: 'center'
    },
    merchantAddress: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: material.primaryColor
    },
    icon: {
        fontSize: 20,
        color: material.gray500
    },
    iconLeft: {
        marginRight: 10
    },
    iconRight: {
        marginLeft: 3
    },
    primary: {
        color: material.primaryColor
    },
    success: {
        color: material.successColor
    },
    button: {
        justifyContent: 'center',
        width: '40%',
    },
    detailButton: {
        flex: 1,
        backgroundColor: material.white500,
        flexDirection: 'column',
        height: 250,
        paddingBottom: 0,
        borderWidth: 0,
        zIndex: 0,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: material.white500,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        alignItems: 'stretch',
        elevation: 0
    },

    labelUnderImage: {
        marginTop: 5,
    },
    listItem: {
        flexDirection: 'column',
        paddingRight: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderBottomWidth: 0,
        paddingTop: 0,
        backgroundColor: material.white500,
        borderRadius: 3,
        marginBottom: 10,
        height: 170
    },
    listButton: {
      backgroundColor: material.white500,
      flexDirection: 'column',
      height: '100%',
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0
      },
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      shadowOpacity: 0
    },
  
}