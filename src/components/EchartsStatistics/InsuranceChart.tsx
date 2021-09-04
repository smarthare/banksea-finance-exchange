import ReactECharts from 'echarts-for-react'
import React from 'react'

const InsuranceChart:React.FC = () => {

  const legends = ['Total deposit interest rate', 'Insured deposit rate']

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: legends,
      textStyle: {
        color: '#ccc'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '2021/9/01',
          '2021/9/02',
          '2021/9/03',
          '2021/9/04',
          '2021/9/05',
          '2021/9/06',
          '2021/9/07',
          '2021/9/08',
          '2021/9/09',
          '2021/9/10',
          '2021/9/11',
          '2021/9/12',
          '2021/9/13',
          '2021/9/14',
          '2021/9/15',
          '2021/9/16',
          '2021/9/17',
          '2021/9/18',
          '2021/9/19',
          '2021/9/20',
          '2021/9/21',
          '2021/9/22',
          '2021/9/23',
          '2021/9/24',
          '2021/9/25',
          '2021/9/26',
          '2021/9/27',
          '2021/9/28',
          '2021/9/29',
          '2021/9/30',
        ]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Total deposit interest rate',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210, 218, 220, 234, 250, 260, 120, 132, 101, 134, 90, 230, 210, 218, 220, 234, 250, 260, 120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Insured deposit rate',
        type: 'line',
        stack: 'Heat',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310, 329, 326, 283, 273, 290, 220, 182, 191, 234, 290, 330, 310, 329, 326, 283, 273, 290,220, 182, 191, 234, 290, 330, 310]
      }
    ]
  }

  return <ReactECharts option={options} />
}

export default InsuranceChart
