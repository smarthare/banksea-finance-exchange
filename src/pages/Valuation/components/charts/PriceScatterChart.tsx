import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionPriceScatterQuery } from '../../../../hooks/queries/insight/collection/useCollectionPriceScatterQuery'

const PriceScatterChart: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const { data } = useCollectionPriceScatterQuery(contractAddress)

  const option = {
    darkMode: true,
    grid: {
      top: 28, bottom: 70, left: 66, right: 60
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      name: 'Value(ETH)',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#666',
          type: 'dotted'
        }
      }
    },
    series: [{
      data: data?.price.map(([timestamp, price]) => ([timestamp * 1000, price])).filter(([, price]) => price !== 0),
      type: 'scatter',
      symbolSize: 5
    }],
    tooltip: {
      formatter: (params: any) => {
        const [timestamp, value] = params.data
        const date = new Date(timestamp)
        return `Ξ${value}&nbsp;&nbsp;&nbsp;(${date.toLocaleString()})`
      }
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
        start: 85,
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty',
        right: 0,
        end: 10,
      }
    ],
  }

  return <ReactECharts option={option} />
}

export {
  PriceScatterChart
}
