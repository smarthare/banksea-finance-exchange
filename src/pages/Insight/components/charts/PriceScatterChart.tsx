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
      type: 'time'
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
      data: data?.price.map(([timestamp, price, ...rest]) => ([timestamp * 1000, price, ...rest])).filter(([, price]) => price !== 0),
      type: 'scatter',
      symbolSize: 5
    }],
    tooltip: {
      formatter: (params: any) => {
        const [timestamp, value, , , imageUrl, tokenName] = params.data
        const date = new Date(timestamp)

        return `
          <div>
            <div style='display: flex; align-items: center; margin-bottom: 10px'>
              <img src='${imageUrl}' style='width: 40px; height: 40px; border-radius: 20px; margin-right: 8px;' alt='${tokenName}'>
              <span>${tokenName}</span>
            </div>
            <div>Ξ${value}&nbsp;&nbsp;&nbsp;(${date.toLocaleString()})</div>
          </div>
        `
      }
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
        start: 85
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty',
        right: 0,
        end: 10
      }
    ]
  }

  return <ReactECharts option={option} />
}

export {
  PriceScatterChart
}
