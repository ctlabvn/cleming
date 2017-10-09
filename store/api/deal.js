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

  getDealUserStatistic(session, lstDealId, fromTime, toTime, dealIds = ''){
    console.log('Deal User Statistic API', session+'---'+lstDealId+'---'+fromTime+'---'+toTime)
    return apiGet('/deal/statisticUser', {lstDealId, fromTime, toTime, dealIds}, session)
  },

  getDealStatistic(session, dealIds, lstPlaceId, fromTime, toTime){
    console.log('Deal Statistic API', session+'---'+dealIds+'---'+lstPlaceId+'---'+fromTime+'---'+toTime)
    return apiGet('/deal/statistic', {dealIds, lstPlaceId, fromTime, toTime}, session)
  },

  getListDeal(session, lstPlaceId, fromDate, toDate, modeGet=3){
    console.log('Get List Deal API', session+'---'+lstPlaceId+'---'+fromDate+'---'+toDate+'---'+modeGet);
    return apiGet('/deal/list', {lstPlaceId, fromDate, toDate, modeGet}, session)
  },

  getSingleDealStatistic(session, dealId, fromTime, toTime){
    console.log('Get Single Deal Statistic API', session+'---'+dealId+'---'+fromTime+'---'+toTime)
    return apiGet('/merchantapp/deal-statistic', {dealId, fromTime, toTime}, session)
  },

  getTransactionNumber(session, placeId, fromTime, toTime){
    console.log('Get transactionNumber API', session+'---'+placeId+'---'+fromTime+'---'+toTime)
    if (!placeId || placeId <= 0) return apiGet('/merchantapp/tran-list', {fromTime, toTime}, session)
    else return apiGet('/merchantapp/tran-list', {placeId, fromTime, toTime}, session)
  },

  getBasicStatistic(session, placeIds, fromTime, toTime){
    console.log('Get basic statistic API', session+'---'+placeIds+'---'+fromTime+'---'+toTime)
    return apiGet('/place/statisticBasic', {placeIds, fromTime, toTime}, session)
  }
}
