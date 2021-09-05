import React from 'react'
import ReactECharts from 'echarts-for-react'

type CollectionHeatCompositionChartData = {
  time: any[]
  owners: number[]
  volumes: number[]
  numberOfTransactions: number[]
  averageTransactionPrice: number[]
}

const CollectionHeatCompositionChart: React.FC = ( ) => {
  const data = require('../../../../assets/mock/collection-heat-composition.json')

  const { time, averageTransactionPrice, numberOfTransactions, volumes, owners } = data

  const legends = ['Average Transaction Price', 'Number of Transactions', 'Volumes', 'Owners']

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: legends,
      textStyle: {
        color: '#ccc'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: time
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Average Transaction Price',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: averageTransactionPrice
      },
      {
        name: 'Number of Transactions',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: numberOfTransactions
      },
      {
        name: 'Volumes',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: volumes
      },
      {
        name: 'Owners',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: owners
      }
    ]
  }

  return <ReactECharts option={options} />
}

export {
  CollectionHeatCompositionChart
}
