// action requestors

export const getActiveCampaign = (...args) => ({
  type: 'app/getActiveCampaign',
  args
})


// action creators
export const replaceActiveCampaign = (data) => ({
  type: 'app/replaceActiveCampaign',
  payload: data,
})
