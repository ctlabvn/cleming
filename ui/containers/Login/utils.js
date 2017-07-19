import { isValidEmail, isValidPhoneNumber } from '~/ui/shared/utils'
import I18n from '~/ui/I18n'

export const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  // validate email
  if(!values.email){
    errors.email = I18n.t('err_phone_email_empty')
  } else if (!isValidEmail(values.email) && !isValidPhoneNumber(values.email)) {
    errors.email = I18n.t('err_phone_email_incorrect')
  } 

  return errors
}