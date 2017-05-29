import material from '~/theme/variables/material'

export const getPopoverOptions = (popoverWidth, fromRect, arrowPadding = -5) => ({
  fromRect,
  // from center
  translateOrigin: { x: popoverWidth / 2 - 20 },
  placement: 'auto',
  contentStyle: {
    width: popoverWidth,
    padding: 0,
  },
  popoverStyle: {
    left: material.deviceWidth - popoverWidth - 3,
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  arrowStyle: {
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

export const formatNumber = str => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export const isValidEmail = (email) => {
  return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null
}

export const isValidPhoneNumber = (phone) => {
  return phone.match(/^\d{10,11}$/) !== null
}

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  // 10 number style
  if (phoneNumber.length == 10){
    let m = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
    return (m[1]+" "+m[2]+" "+m[3])
  //11 number style
  }else{
    let m = phoneNumber.match(/^(\d{4})(\d{3})(\d{4,})$/)
    return (m[1]+" "+m[2]+" "+m[3])
  }

  }