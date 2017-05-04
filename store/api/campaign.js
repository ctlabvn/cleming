import { apiGet, apiPost } from '~/store/api/common'

export default {

  getActiveCampaign(accessToken, campaignpublicid='') {    
    return apiPost('/Api/CampaignService/GetActiveCampaignForCurrentUser', {campaignpublicid}, accessToken)
  },

}
