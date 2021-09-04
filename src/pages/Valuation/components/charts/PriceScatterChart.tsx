import React from 'react'
import ReactECharts from 'echarts-for-react'

type PriceData = Array<[string, number]>

const PriceScatterChart: React.FC<{ priceData: PriceData }> = ({ priceData }) => {
  const option = {
    darkMode: true,
    grid: {
      top: 20, bottom: 20, left: 66, right: 20
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {},
    series: [{
      data: priceData,
      type: 'scatter'
    }],
    tooltip: {
      formatter: '{b0}: {c0}'
    }
  }

  return <ReactECharts option={option} />
}

export {
  PriceScatterChart
}
