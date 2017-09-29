import material from '~/theme/variables/material.js'
export default {
  iconNext: {
    position: 'absolute',
    right: 0,
    top: '48%'
  },
  iconPrevious: {
    position: 'absolute',
    left: 0,
    top: '48%'
  },
  icon: {
    color: 'white',
    fontSize: 22
  },
  imageSlider: {
    width: material.deviceWidth,
    height: 250,
  },
  iconContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
}
