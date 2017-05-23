export default {
    block: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30

    },
    container: { 
        paddingBottom: 40, 
        backgroundColor: 'white' 
    },
    content: {
        padding: 10,
    },
    navigateBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 20,
        elevation: 5,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentRootChild: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
        height: '100%',
        padding: 10
    }
    
}