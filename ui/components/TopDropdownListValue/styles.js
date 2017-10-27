import material from '~/theme/variables/material'
export default {
    ovarlayContainerOpen: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        zIndex: 500,
        elevation: 5,
        position: 'absolute',
        top: material.toolbarHeight + 50,
        right: 0,
        left: 0,
        bottom: 0
    },
    ovarlayContainerOpenPlus: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        zIndex: 500,
        elevation: 5,
        position: 'absolute',
        top: material.toolbarHeight + 100,
        right: 0,
        left: 0,
        bottom: 0
    },
    ovarlayContainerClose: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 500,
        elevation: 5,
        position: 'absolute',
        top: 0,
        width: 0,
        height: 0
    },

    dropdownList: {
        backgroundColor: 'transparent',
        width: '100%',
        zIndex: 1000,
        elevation: 10,
        position: 'absolute',
        // top: 50+material.toolbarHeight

    },
    dropdownListItem: {
        borderBottomWidth: 0,
        justifyContent: 'flex-start',
        zIndex: 1000,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropdownListItemText: {
        color: material.white500,    
        // overflow: 'hidden'
        maxWidth: material.deviceWidth-50    
        // fontWeight: '100'
    },
    content: {
        position: 'absolute',
        top: 75
    },
    overlay: {
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10
    },
    multipleActionBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1000
    },
    multipleActionIcon: {
        fontSize: 40,
        color: 'white',
    },
    multipleActionIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    multipleActionContainerCancel: {
        width: 50,
        height: 50,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        // backgroundColor: 'rgba(0,0,0,0.6)'
    },
    multipleActionContainerOk: {
        width: 50,
        height: 50,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: material.primaryColor,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: material.primaryColor
    },
    checkedIcon: {
        color: 'white',
        fontSize: 25,
        marginRight: 5
    },
    get backdropClose() {
        return { ...this.backdrop, opacity: 0 }
    }

}