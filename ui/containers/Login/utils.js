import { isValidEmail, isValidPhoneNumber } from '~/ui/shared/utils'

export const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  // validate email
  if(!values.email){
    errors.email = 'Bạn phải nhập Emai/Số Điện Thoại/Mật khẩu'
  } else if (!isValidEmail(values.email) && !isValidPhoneNumber(values.email)) {
    errors.email = 'Email/Số Điện Thoại không hợp lệ. Vui lòng kiểm tra lại!'
  } 

  return errors
}