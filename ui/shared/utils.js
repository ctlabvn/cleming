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
  if (!str) return str
  if (!isNaN(str)){
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


export const isValidEmail = (email) => {
  return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null
}

export const isValidPhoneNumber = (phone) => {
  return phone.match(/^\d{10,11}$/) !== null
}

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''
  if (!isNaN(phoneNumber)) {
    phoneNumber = phoneNumber.toString()
  }
  if ((m = phoneNumber.match(/^(84)(\d{2})(\d{3})(\d{4})$/))
    || (m = phoneNumber.match(/^(84)(\d{2})(\d{4})(\d{4})$/))) {
    return `(${m[1]})${m[2]} ${m[3]} ${m[4]}`
  } else if ((m = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/))
    || (m = phoneNumber.match(/^(\d{4})(\d{3})(\d{4})$/))) {
    return `${m[1]} ${m[2]} ${m[3]}`
  } else {
    m = phoneNumber.match(/^(\d{4})(\d{4})(\d{4,})$/)
    return `${m[1]} ${m[2]} ${m[3]}`
  }
}


export const convertVn = (str) => {
  return str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/gi, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, 'y')
    .replace(/đ/gi, 'd');
}