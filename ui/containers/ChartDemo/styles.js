import material from '~/theme/variables/material'

export default {
  container: {
    marginTop:10,
    marginBottom:10,
  },
  avatarContainer:{           
    alignSelf: 'center',
    zIndex:10,    
  },
  textSmall: {
    fontSize: 14,
  },
  avatar:{          
    width: 94,
    get height(){
      return this.width
    },
    get borderRadius(){
      return Math.round(this.width /2)
    },
  },
  photoIcon:{    
    position:'absolute',
    borderColor: material.blueColor,
    borderWidth: 1,
    width: 18,
    height: 18,
    borderRadius: 9,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:0,
    left:10,    
  },
  listItemContainer: {
    flexDirection: 'column',
    alignItems:'flex-start'
  },
  listItemInnerContainer: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between'
  },
  normalText: {
    marginTop: 5
  },
  percentText: {
    position: 'absolute',
    textAlign: 'center',
    width: 96,
    top: 35,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionInnerContainer: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
  chartContainer: {
    marginTop: 10,
    paddingBottom: 15,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:material.listBorderColor,
  },
  textOfYear: {
    marginLeft: 20,
    marginTop:10,
    fontSize: 10
  },
  axisXContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 15,
    flex: 1,
  }
}