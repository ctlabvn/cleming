import material from '~/theme/variables/material'

export default {
  container: {
    borderTopWidth:0.5,
    borderColor:'#ddd'
  },
  footerIcon: {
    color:material.tabBarTextColor,    
    paddingTop:2,
    marginLeft:5,
    marginRight:5,
    fontSize: 18,
  },
  get footerIconActive() {
    return {...this.footerIcon, color: material.tabBarActiveTextColor}
  },
  badgeIcon: {
    marginTop: -18,
  },
  badgeText: {
    left:18,
    top:-2,
  }
}