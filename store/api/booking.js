import { apiGet } from '~/store/api/common'
export default {
    // /booking/list?from_time=1494435600&to_time=1494499066&place_list=1223,2334&status=0&page=1

    list(xsession, place_list, from_time=1320985607, to_time=1510374407, status=0, page = 1) {
        console.log('Go to booking API', place_list)
        console.log('xss booking', xsession)
        return apiGet('/booking/list', {place_list, from_time, to_time, status, page}, xsession)
    }
}