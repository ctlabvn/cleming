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
      width: material.deviceWidth - 40,
      height: 250,
      stroke: '#4990E2',
      colors: [
        {offset: '50%', color:'#4990E2'},
        {offset: '100%', color: '#FFFFFF'},
      ],
      margin: {
        top: 10,
        left: 10,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [
          {value:'Jan'},
          {value:'Feb'},
          {value:'Mar'},
          {value:'Apr'},
          {value:'May'},
          {value:'Jun'},          
        ],
        label: {
          fontFamily: 'Roboto',
          fontSize: 12,
          fontWeight: true,
          // fill: ['#34495E', '#FFFFFF'],
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Roboto',
          fontSize: 10,
          fontWeight: true,
          // fill: '#34495E'
        }
      }
    }
}