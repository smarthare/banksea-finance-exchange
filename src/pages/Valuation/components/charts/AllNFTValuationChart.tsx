import React from 'react'
import ReactECharts from 'echarts-for-react'
import { NftMarketCapitalization } from '../../../../hooks/queries/insight/overview/useNftMarketTotalValuationQuery'
import { simplifyNumber } from '../../../../utils'

const AllNFTValuationChart: React.FC<{
  list: NftMarketCapitalization[]
}> = ({ list }) => {
  const time = list.map(o => o.createTime * 1000).sort((a, b) => a - b)
  const usd = list.map((o, index) => ([time[index], o.marketCapitalizationUsd]))
  const eth = list.map((o, index) => ([time[index], o.marketCapitalizationEth]))

  const options = {
    darkMode: true,
    grid: { top: 32, right: 60, bottom: 24, left: 72 },
    legend: {
      data: ['USD', 'ETH'],
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: {
      type: 'time',
      data: time
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'USD($)',
        axisLabel: {
          formatter: (params: any) => `$${simplifyNumber(params)}`
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#666',
            type: 'dotted'
          }
        },
        min: (value: any) => value.min * .99
      },
      {
        type: 'value',
        show: true,
        name: 'ETH(Ξ)',
        axisLabel: {
          formatter: (params: any) => `Ξ${simplifyNumber(params)}`
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#666',
            type: 'dotted'
          }
        },
        min: (value: any) => value.min * .99
      }
    ],
    series: [
      {
        name: 'USD',
        data: usd,
        type: 'line',
        smooth: true
      },
      {
        name: 'ETH',
        data: eth,
        type: 'line',
        yAxisIndex: 1,
        smooth: true
      }
    ],
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }],
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
