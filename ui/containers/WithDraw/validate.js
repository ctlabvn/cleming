import I18n from '~/ui/I18n'
// export const required = value => value ? undefined : I18n.t('err_field_must_not_empty')

const isDigitOnly = (str) => {
	if (!str) return false
	return /^\d+$/.test(str)

}

const isTextOnly = (str) => {
    for (i = 0; i < str.length; i++) {
        // console.warn('test ' + value)
        if (!(('a' <= str[i] && str[i] <= 'z') ||(('A' <= str[i] && str[i] <= 'Z') || (str[i] == ' ')))) return false
    }
    return true;
}

const isPositiveDigit = (data) => {
    value = data.split('.').join('');
    if (parseInt(value) > 0) return true;
    return false;
}

export const validate = (values) => {
	let errors = {}

	if (!values.money_amount) {
        errors.money_amount = I18n.t('err_field_must_not_empty')
        return errors
	}

	if (!isPositiveDigit(values.money_amount)) {
        errors.money_amount = I18n.t('the_money_have_to_positive_digit')
        return errors
    }

    if (!values.account_number){
        errors.account_number = I18n.t('err_field_must_not_empty')
        return errors
    }
    // if (!isDigitOnly(values.account_number)){
    //     errors.account_number = I18n.t('err_account_number_must_be_number')
    //     return errors
    // }

	if (!values.account_owner){
		errors.account_owner = I18n.t('err_field_must_not_empty')
		return errors
	}

    if (!isTextOnly(values.account_owner)){
        errors.account_owner = 'Sai định dạng'
        return errors
    }

    if (!values.phone_number) {
        errors.phone_number = I18n.t('err_field_must_not_empty')
        return errors
    }

    if (!isDigitOnly(values.phone_number)){
        errors.phone_number = 'số điện thoại chỉ chứa số'
        return errors
    }

	// if (!values.identity_card){
	// 	errors.identity_card = I18n.t('err_field_must_not_empty')
	// 	return errors
	// }
	// if (!isDigitOnly(values.identity_card)){
	// 	errors.identity_card = I18n.t('err_identity_card_must_be_number')
	// 	return errors
	// }
    //
	// if (!values.area){
	// 	errors.area = I18n.t('err_field_must_not_empty')
	// 	return errors
	// }
    //
	// if (!values.branch){
	// 	errors.branch = I18n.t('err_field_must_not_empty')
	// 	return errors
	// }

	return errors
}