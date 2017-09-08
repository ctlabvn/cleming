import I18n from '~/ui/I18n'
import moment from 'moment'
import { PROMO_TYPE } from "~/store/constants/app";

// export const PROMO_TYPE = {
//   PERCENT: 1,
//   GIFT: 2,
//   MONEY: 3
// }

const isDigitOnly = (str) => {
	if (!str) return false
	return /^\d+$/.test(str)

}
export const validate = (values) => {
	console.log('Validate Values', values)
	let errors = {}
	if (!values.dealTitle){
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

	let from = moment(values.fromDate, "MM/DD/YYYY").startOf('day').unix()
	let to = moment(values.toDate, "MM/DD/YYYY").endOf('day').unix()
	if (from > to){
		errors.toDate = I18n.t('err_to_date_must_later_than_from_date')
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

	if (values.promoType == PROMO_TYPE.MONEY){
		if (!isDigitOnly(values.leftPromo)){
			errors.leftPromo = I18n.t('err_money_must_number')
			return errors
		}
		if (!isDigitOnly(values.promoTitle)){
			errors.promoTitle = I18n.t('err_money_must_number')
			return errors
		}
		if (values.leftPromo <= values.promoTitle){
			errors.promoTitle = I18n.t('err_new_price_must_smaller_than_old_price')
			return errors
		}
	}else if (values.promoType == PROMO_TYPE.PERCENT){
		if (!isDigitOnly(values.leftPromo)){
			errors.leftPromo = I18n.t('err_percent_must_number')
			return errors
		}
		if (values.leftPromo > 100){
			errors.leftPromo = I18n.t('err_invalid_percent_number')
			return errors
		}
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
