export const validate = (values) => {
  const errors = {}
  // first time it is empty
  if (!values) return errors
  // validate email
  if (!values.oldPassword || !values.oldPassword.match(/^[\w\d]{4,12}$/)) {
    errors.oldPassword = 'Mật khẩu hiện tại không đúng, vui lòng kiểm tra lại'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Bạn phải nhập lại mật khẩu mới'
  } else if (values.newPassword !== values.reNewPassword) {
    errors.newPassword = 'Hai mật khẩu bạn nhập không khớp nhau'
  } else if (values.oldPassword === values.newPassword) {
    errors.newPassword = 'Mật khẩu mới không được giống mật khẩu hiện tại'
  } else if (!values.newPassword.match(/^(\S){4,12}$/)) {
    errors.newPassword = 'Mật khẩu mới có độ dài 4 - 12 kí tự, phân biệt chữ hoa và chữ thường'
  }
  // console.log(errors)
  return errors
}

// oldPassword
// newPassword
// reNewPassword

// # 6 – 12
// # Mật khẩu mới không được giống
// # mật khẩu hiện tại


// # Bạn
// # phải nhập lại mật khẩu mới”

// # Mật khẩu hiện tại không đúng, vui lòng kiểm tra lại”

// # Hai mật khẩu bạn nhập không khớp nhau”


