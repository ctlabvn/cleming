import moment from 'moment'
export const singleChartConfig =  {
    width: 250,
    height: 200,
    margin: {
      top: 20,
      left: 20,
      bottom: 50,
      right: 20
    },
    gutter: 20,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3,
      fontWeight: true
    },
    percent: {
      fontFamily: 'Arial',
      fontSize: 13,
      fill: '#34495E',
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
        fontSize: 10,
        fontWeight: true,
        fill: '#34495E',
        rotate: 0
      }
    },
    axisY: {
      showAxis: false,
      showLines: false,
      showLabels: false,
      showTicks: false,
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

export const doubleChartConfig =  {
  width: 250,
  height: 200,
  margin: {
    top: 20,
    left: 20,
    bottom: 50,
    right: 20
  },
  gutter: 20,
  animate: {
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3,
    fontWeight: true
  },
  percent: {
    fontFamily: 'Arial',
    fontSize: 13,
    fill: '#34495E',
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
      fontSize: 10,
      fontWeight: true,
      fill: '#34495E',
      rotate: 45
    }
  },
  axisY: {
    showAxis: false,
    showLines: false,
    showLabels: false,
    showTicks: false,
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    width: 300,
    height: 210,
    r: 0,
    R: 100,
    legendPosition: 'topLeft',
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
