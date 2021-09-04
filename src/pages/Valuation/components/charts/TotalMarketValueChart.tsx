import React from 'react'
import * as echarts from 'echarts/core'
import ReactECharts from 'echarts-for-react'

type TotalMarketValueChartData = {
  value: number[]
  time: Date[] | string[]
}

const TotalMarketValueChart: React.FC<{ data: TotalMarketValueChartData }> = ({ data }) => {
  const option = {
    darkMode: true,
    grid: {
      top: 20, bottom: 20, left: 40, right: 20
    },
    tooltip: {
      trigger: 'axis',
      position: function(pt: any) {
        return [pt[0], '10%']
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.time
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 10
    }],
    series: [
      {
        name: 'Market Value',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(255, 158, 68)'
          }, {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }])
        },
        data: data.value
      }
    ]
  }

  return <ReactECharts option={option} />
}

export {
  TotalMarketValueChart
}
