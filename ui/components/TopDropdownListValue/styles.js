import material from '~/theme/variables/material'
export default {
    ovarlayContainerOpen: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        zIndex: 500,
        elevation: 5,
        position: 'absolute',
        top: 106,
        right: 0,
        left: 0,
        bottom: 0
    },
    ovarlayContainerClose: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        zIndex: 500,
        elevation: 5,
        position: 'absolute',
        top: 106,
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
        justifyContent: 'center',
        zIndex: 1000
    },
    dropdownListItemText: {
        color: material.white500,
        fontWeight: '100'
    },
    content: {
        position: 'absolute',
        top: 75
    },
    overlay: {
        // flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        elevation: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    get backdropClose() {
        return { ...this.backdrop, opacity: 0 }
    }

}