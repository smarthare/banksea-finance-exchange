import React from 'react'
import ReactECharts from 'echarts-for-react'
import { NftMarketCapitalization } from '@/hooks/queries/insight/overview/useNftMarketTotalValuationQuery'
import { simplifyNumber } from '@/utils'

const AllNFTValuationChart: React.FC<{
  list: NftMarketCapitalization[]
}> = ({ list }) => {
  const sortedList = list.sort((a, b) => a.createTime - b.createTime)

  const time = sortedList.map(o => o.createTime * 1000)
  const eth = sortedList.map((o, index) => ([time[index], o.marketCapitalizationEth]))

  const options = {
    darkMode: true,
    grid: { top: 32, right: 60, bottom: 24, left: 72 },
    xAxis: {
      type: 'time',
      data: time
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'Valuation',
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
        min: (value: any) => value.min * .97
      }
    ],
    series: [
      {
        name: 'ETH',
        data: eth,
        type: 'line',
        smooth: true
      }
    ],
    dataZoom: [{
      type: 'inside',
      start: 80,
      end: 100
    }],
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const eth = simplifyNumber(params[0].data[1])
        const time = new Date(params[0].data[0]).toLocaleString()

        return `
          <div>
            <div>${time}</div>
            <div>
              ${params[0].marker}Valuation: Ξ${eth}
            </div>
          <div/>
        `
      }
    }
  }

  return (
    <ReactECharts option={options} />
  )
}

export {
  AllNFTValuationChart
}
