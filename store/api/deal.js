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
  }



}
