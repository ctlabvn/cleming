import moment from 'moment'
export const barChartConfig =  {
    width: 300,
    height: 300,
    margin: {
      top: 20,
      left: 20,
      bottom: 50,
      right: 20
    },
    color: {'r':223,'g':154,'b':20},
    colors: ['#005cc5', '#d73a49', '#6f42c1', '#28a745', '#586069'],
    pallete:[
      {'r':25,'g':99,'b':201},
      {'r':24,'g':175,'b':35},
      {'r':190,'g':31,'b':69},
      {'r':100,'g':36,'b':199},
      {'r':214,'g':207,'b':32},
      {'r':198,'g':84,'b':45}
    ],
    gutter: 20,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E',
        rotate: 0
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E'
      }
    }
}

export const pieChartConfig = {
    margin: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    },
    width: 350,
    height: 350,
    // color: '#2980B9',
    r: 0,
    R: 150,
    legendPosition: 'topRight',
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 13,
      fontWeight: true,
      color: '#ECF0F1'
    },
    pallete:[
      {'r':25,'g':99,'b':201},
      {'r':24,'g':175,'b':35},
      {'r':190,'g':31,'b':69},
      {'r':100,'g':36,'b':199},
      {'r':214,'g':207,'b':32},
      {'r':198,'g':84,'b':45}
    ],
    accessorKey: "population",
    color: "#2980B9"

}

export const lineChartConfig = {
  width: 250,
  height: 250,
  color: '#2980B9',
  margin: {
    top: 10,
    left: 35,
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
    tickValues: [],
    labelFunction: ((v) => {
      let d = moment('2016-10-08 14:00','YYYY-MM-DD HH:mm')
      return d.add((v * 2),'hours').format('h:mm A')
    }),
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
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
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    }
  }
}
