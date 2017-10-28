import I18n from '~/ui/I18n'
import moment from 'moment'
import { PROMO_TYPE, EXCLUSIVE_TYPE} from "~/store/constants/app";
import { formatMoney, revertFormatMoney } from "~/ui/shared/utils"

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
	let errors = {}
	console.log('Call validate Props', values);
	if (!values.dealTitle){
		errors.dealTitle = I18n.t('err_field_must_not_empty')
		errors._error='dealTitle'
		return errors
	}

  if (!values.fromDate){
		errors.fromDate = I18n.t('err_field_must_not_empty')
		errors._error='fromDate'
		return errors
	}

  if (!values.toDate){
  		errors._error='toDate'
		errors.toDate = I18n.t('err_field_must_not_empty')
		return errors
	}

	let from = moment(values.fromDate, "MM/DD/YYYY").startOf('day').unix()
	let to = moment(values.toDate, "MM/DD/YYYY").endOf('day').unix()
	let now = moment().unix()
	if (from > to){
		errors._error='toDate'
		errors.toDate = I18n.t('err_to_date_must_later_than_from_date')
		return errors
	}
	if (to<now){
		errors._error='toDate'
		errors.toDate = I18n.t('err_to_date_must_later_than_now')
		return errors
	}

//   if (!values.leftPromo){
// 		errors.leftPromo = I18n.t('err_field_must_not_empty')
// 		return errors
// 	}
	if (values.exclusiveType==EXCLUSIVE_TYPE.CASHBACK){
		if (!values.promoTitle){
	  		errors._error='promoTitle'
			errors.promoTitle = I18n.t('err_field_must_not_empty')
			return errors
		}else if (!isDigitOnly(values.promoTitle)){
			errors._error='promoTitle'
			errors.promoTitle = I18n.t('err_percent_must_number')
			return errors
		}

		if (values.moneyLimit && !isDigitOnly(revertFormatMoney(values.moneyLimit))){
			errors._error='moneyLimit'
			errors.moneyLimit = I18n.t('err_invalid_money_limit')
			return errors
		}
	}

  	if (!values.description){
  		errors._error='description'
		errors.description = I18n.t('err_field_must_not_empty')
		return errors
	}

  	if (!values.searchTag){
  		errors._error='searchTag'
		errors.searchTag = I18n.t('err_field_must_not_empty')
		return errors
	}




	return errors
}
