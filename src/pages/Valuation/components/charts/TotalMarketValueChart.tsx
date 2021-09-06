import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionMarketValueQuery } from '../../../../hooks/queries/insight/collection/useCollectionMarketValueQuery'
import { simplifyNumber } from '../../../../utils'

const TotalMarketValueChart: React.FC<{ seriesId: string }> = ({ seriesId }) => {
  const { data } = useCollectionMarketValueQuery(seriesId)

  const option = {
    darkMode: true,
    grid: {
      top: 20, bottom: 20, left: 60, right: 20
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      min: (value: any) => value.min * .97,
      axisLabel: {
        formatter: (params: any) => `Ξ${simplifyNumber(params)}`
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const [timestamp, value] = params[0].data
        const date = new Date(timestamp)
        return `Ξ${simplifyNumber(value)}&nbsp;&nbsp;&nbsp;(${date.toLocaleString()})`
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }],
    series: [
      {
        name: 'Total Market Value',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: data?.value.map((v, idx) => ([data.time[idx] * 1000, v])).sort((a, b) => a[0] - b[0])
      }
    ]
  }

  return <ReactECharts option={option} />
}

export {
  TotalMarketValueChart
}
