import { apiGet, apiPost } from '~/store/api/common'

export default {

  getCountries() {    
    return apiGet('/Api/Data/Country')
  },

  getCities(countryCode) {
    return apiGet('/Api/Data/Country/City', {countryCode})
  },  

}
