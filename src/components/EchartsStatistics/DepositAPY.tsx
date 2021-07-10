import React from 'react'
import ReactECharts from 'echarts-for-react'

const DepositAPY: React.FC = () => {
  const option = {
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:[]
    },
    toolbox: {},
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
              color:'#F3AF00'
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


  return <ReactECharts option={option} style={{ width: '100%', height: 150, }} />
}

export default DepositAPY
