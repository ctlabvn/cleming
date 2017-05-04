import material from '~/theme/variables/material'

export const getPopoverOptions = (popoverWidth, fromRect, arrowPadding=-5) => ({
  fromRect,
  // from center
  translateOrigin: {x:popoverWidth/2-20},
  placement: 'auto',
  contentStyle:{
    width:popoverWidth,
    padding:0,
  },
  popoverStyle:{
    left: material.deviceWidth-popoverWidth -3,
  },
  backgroundStyle:{
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  arrowStyle:{
    // borderTopColor:'transparent'
    left: popoverWidth - 30 + arrowPadding,
  },
})


export const getTextParts = text => {  
  const match = text.match(/#(.*?)#/)    
  return match 
    ? [text.substr(0, match.index), match[1], text.substr(match.index + match[0].length)] 
    : [text]
}