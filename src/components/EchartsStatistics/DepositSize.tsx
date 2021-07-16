import React from 'react'
import ReactECharts from 'echarts-for-react'

const DepositSize: React.FC<{ depositStatistics: any }> = ({ depositStatistics }) => {

  const data =  [['Jun 16', 88827969],['Jun 17', 399161649],['Jun 18', 410138826],['Jun 19', 206872921],['Jun 20', 130269142],['Jun 21', 30250371],['Jun 22', 322578645],['Jun 23', 242255393],['Jun 24', 24380577],['Jun 25', 347173526],['Jun 26', 359535528]]

  const dateList = depositStatistics?.map(function (item: any[]) {
    return item[0]
  })

  const valueList = depositStatistics?.map(function (item: any[]) {
    return item[1]
  })

  const option = {
    // Make gradient line here
    visualMap: [{
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    }],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [{
      data: dateList
    }, {
      data: dateList,
      gridIndex: 1
    }],
    yAxis: [{
    }, {
      gridIndex: 1
    }],
    grid: [{}, {}],
    series: [{
      type: 'line',
      showSymbol: false,
      data: valueList
    }]
  }


  return <ReactECharts option={option} style={{ width: '100%', height: 230, }} />
}

export default DepositSize
