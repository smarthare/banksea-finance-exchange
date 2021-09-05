import React from 'react'
import ReactECharts from 'echarts-for-react'
import { NftMarketCapitalization } from '../../../../hooks/queries/insight/overview/useNftMarketTotalValuationQuery'
import { simplifyNumber } from '../../../../utils'

const AllNFTValuationChart: React.FC<{
  list: NftMarketCapitalization[]
}> = ({ list }) => {
  const usd = list.map(o => o.marketCapitalizationUsd)
  const time = list.map(o => o.createTime)
  const eth = list.map(o => o.marketCapitalizationEth)

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
      type: 'category',
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
        type: 'line'
      },
      {
        name: 'ETH',
        data: eth,
        type: 'line',
        yAxisIndex: 1
      }
    ],
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100,
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
