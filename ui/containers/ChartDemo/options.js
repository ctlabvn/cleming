import material from '~/theme/variables/material'

export default {
    data : [
      [{
        "x": 0,
        "y": 1
      }, {
        "x": 1,
        "y": 2
      }, {
        "x": 2,
        "y": 1
      },{
        "x": 3,
        "y": 4
      }, {
        "x": 4,
        "y": 1
      }, {
        "x": 5,
        "y": 3
      }],
    ],
    chart : {
      width: material.deviceWidth - 60,
      get height(){
        return this.width * 0.9
      },
      stroke: '#4990E2',
      min: 0,
      max: 5,
      showAreas: true,
      // gradient
      colors: [
        {offset: '20%', color:'#4990E2'},
        {offset: '100%', color: '#FFFFFF'},
      ],
      margin: {
        top: 10,
        left: 20,
        bottom: 10,
        right: 20
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      point:{
        color: material.blueColor,
        size: 2,
        fill: '#fff',
      },
      axisX: {
        showAxis: true,        
        showLabels: false,        
        zeroAxis: false,
        color: material.grayColor,
        tailLength: 0,
        opacity: 1,
        strokeWidth: 1,
        orient: 'bottom',        
        tickValues: [
          {value:'Jan'},
          {value:'Feb'},
          {value:'Mar'},
          {value:'Apr'},
          {value:'May'},
          {value:'Jun', x: -15},          
        ],
        label: {
          fontFamily: 'Roboto',
          fontSize: 12,          
          fill: material.textMuteColor,
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,        
        zeroAxis: false,
        tailLength: 0,
        color: material.grayColor,
        gridColor: '#979797',        
        gridOpacity: 0.2,
        opacity: 1,
        strokeWidth: 1,
        orient: 'left',        
        tickValues: [
          {value:0, textAnchor: 'start', x: -15, y: -15},
          {value:1, textAnchor: 'start', x: -15},
          {value:2, textAnchor: 'start', x: -15},
          {value:3, textAnchor: 'start', x: -15},
          {value:4, textAnchor: 'start', x: -15},
          {value:5, textAnchor: 'start', x: -15, y: 0},
        ],
        label: {
          fontFamily: 'Roboto',
          fontSize: 12,          
          fill: material.textMuteColor,
        }
      }
    }
}