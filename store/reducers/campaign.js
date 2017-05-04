
export const campaign = (state = {activeCampaign:{}}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceActiveCampaign':      
      return {...state, activeCampaign: payload }     
    default:
      return state
  }
}

