import React from 'react'
import ReactECharts from 'echarts-for-react'

export type AllNFTValuationChartData = {
  usd: number[]
  eth: number[],
  time: (Date | string)[]
}

const AllNFTValuationChart: React.FC<AllNFTValuationChartData> = ({ usd, eth, time }) => {
  const options = {
    darkMode: true,
    grid: { top: 32, right: 48, bottom: 24, left: 48 },
    legend: {
      data: ['USD', 'ETH'],
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: {
      type: 'category',
      data: time
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'USD($)',
        axisLabel: {
          formatter: '${value}'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#666',
            type: 'dotted'
          }
        }
      },
      {
        type: 'value',
        show: true,
        name: 'ETH(Ξ)',
        axisLabel: {
          formatter: 'Ξ{value}'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#666',
            type: 'dotted'
          }
        }
      }
    ],
    series: [
      {
        name: 'USD',
        data: usd,
        type: 'line'
      },
      {
        name: 'ETH',
        data: eth,
        type: 'line',
        yAxisIndex: 1
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }

  return (
    <ReactECharts option={options} />
  )
}

export {
  AllNFTValuationChart
}
