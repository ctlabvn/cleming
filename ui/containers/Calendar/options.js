import material from '~/theme/variables/material'
const buttonWidth = Math.round((material.deviceWidth - 30) / 21)
export default {
  calendar: {
    year: 2017,
    months: [
      ['01', '02', '03'],
      ['04', '05', '06'],
      ['07', '08', '09'],
      ['10', '11', '12'],   
    ],
  },
  calendarStyles: {
    title:{
      color: material.tabBarActiveTextColor,
      fontWeight: '500',
      textAlign: 'left',        
      margin: 0,      
      marginTop: 10,
      fontSize: 12,
    },
    day: {
      fontSize: 8,     
      textAlign: 'center',    
      fontWeight: '500',    
      color: material.textColor,  
    },
    dayButton:{
      borderTopWidth: 0,        
      padding: 0,
      height: 15,
      width: buttonWidth,
      height: buttonWidth,
    },
    weekendDayText: {
      color: material.textColor,
    },
    hasEventCircle: {
      backgroundColor:material.tabBarActiveTextColor,    
    },
    dayButtonFiller: {
      width: buttonWidth,
      height: buttonWidth,
    },
    dayCircleFiller:{
      width: buttonWidth,
      height: buttonWidth,
      borderRadius: buttonWidth / 2,
    },
    currentDayCircle: {    
      backgroundColor:material.tabBarActiveTextColor, 
    },
    hasEventText: {
      color: '#fff',
    },
    calendarContainer:{
      flex: 1,    
    },
    monthContainer: {
      width: (material.deviceWidth - 30) / 3,       
    },    
    weekRow: {
      justifyContent: 'space-between', 
    },
    calendarContainer: {
      backgroundColor: 'transparent',      
    }
  }
}