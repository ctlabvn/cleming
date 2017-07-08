import I18n from '~/ui/I18n'
export const validate = (values) => {
  const errors = {}
  // first time it is empty
  if (!values) return errors
  // validate email
  if (!values.oldPassword || !values.oldPassword.match(/^[\w\d]{4,12}$/)) {
    errors.oldPassword = I18n.t('err_current_password_invalid')
  }

  if (!values.newPassword) {
    errors.newPassword = I18n.t('err_need_new_password')
  } else if (values.newPassword !== values.reNewPassword) {
    errors.newPassword = I18n.t('err_password_not_match')
  } else if (values.oldPassword === values.newPassword) {
    errors.newPassword = I18n.t('err_new_password')
  } else if (!values.newPassword.match(/^(\S){4,12}$/)) {
    errors.newPassword = I18n.t('err_password_length')
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


