import material from '~/theme/variables/material.js'
export default {
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: material.primaryColor,
    width: '100%'
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    width: '100%'
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: material.gray400
  },
  imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
  },

  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  imageItem: {
    width: '47%',
    marginTop: 5,
    marginRight: 5,
    marginLeft: 0,
    marginBottom: 0,
    padding: 5
  },
  close: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    right: 0,
    elevation: 3
  },
  setAvatarContainer: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5
  },
  setAvatarContainerActive: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    backgroundColor: material.primaryColor,
    borderRadius: 20,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconDone: {
    color: 'white',
    fontSize: 16
  },
  addImageIcon: {
    color: material.gray500,
    fontSize: 32
  },
  imageSizeContainer: {
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '47%'
  }
}
