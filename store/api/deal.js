import { apiGet, apiPost, postFormData } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user
  */


  /**
  * Logs the current user out
  */
  getDealCategory (session) {
    // return fetchJsonWithToken(token, `/logout`)
    console.log('Deal Category API', session)
    return apiGet('/deal/category', {}, session)
  },

  // createDeal(session, data){
  //   console.log('Create Deal API', session)
  //   console.log('Create Deal API', data)
  //   return apiPost('/deal/create', data, session)
  // }

  createDeal(session, data){
    console.log('Create Deal API', session)
    console.log('Create Deal API', data)
    return postFormData('/deal/create', data, session)
  },

  getDealUserStatistic(session, dealIds, fromTime, toTime){
    console.log('Deal User Statistic API', session+'---'+dealIds+'---'+fromTime+'---'+toTime)
    return apiGet('/deal/statisticUser', {dealIds, fromTime, toTime}, session)
  },

  getDealStatistic(session, dealIds, fromTime, toTime){
    console.log('Deal Statistic API', session+'---'+dealIds+'---'+fromTime+'---'+toTime)
    return apiGet('/deal/statistic', {dealIds, fromTime, toTime}, session)
  },

  getListDeal(session, lstPlaceId, fromDate, toDate, modeGet=3){
    console.log('Get List Deal API', session+'---'+lstPlaceId+'---'+fromDate+'---'+toDate+'---'+modeGet);
    return apiGet('/deal/list', {lstPlaceId, fromDate, toDate, modeGet}, session)
  },




}
