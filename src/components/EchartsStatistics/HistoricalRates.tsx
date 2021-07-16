import React from 'react'
import ReactECharts from 'echarts-for-react'

const HistoricalRates: React.FC = () => {
  const option = {
    title: {
      text: 'Historical rates'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:[]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : ['May 7','May 14','May 21','May 28 ','Jun 5','Jun 12']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'Historical rates',
        type:'line',
        itemStyle : {
          normal : {
            lineStyle:{
              color:'#6243F1'
            }
          }
        },
        areaStyle: { normal: {
          color: '#101D44'
        } },
        data:[0.1, 0.15, 0.3, 0.2, 0.7, 0.9, 0.12]
      }
    ]
  }


  return <ReactECharts option={option} style={{ width: 800, height: 200, marginTop: '6rem' }} />
}

export default HistoricalRates
