import I18n from '~/ui/I18n'
// export const required = value => value ? undefined : I18n.t('err_field_must_not_empty')

const isDigitOnly = (str) => {
	if (!str) return false
	return /^\d+$/.test(str)

}
export const validate = (values) => {
  console.log('Validate Create Deal', values);
	let errors = {}
	if (!values.dealTitle){
    console.log('This Case Deal Title')
		errors.dealTitle = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.fromDate){
		errors.fromDate = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.toDate){
		errors.toDate = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.leftPromo){
		errors.leftPromo = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.promoTitle){
		errors.promoTitle = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.description){
		errors.description = I18n.t('err_field_must_not_empty')
		return errors
	}

  if (!values.searchTag){
		errors.searchTag = I18n.t('err_field_must_not_empty')
		return errors
	}




	return errors
}
