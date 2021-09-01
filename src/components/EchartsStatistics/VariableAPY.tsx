import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

const VariableAPY: React.FC = () => {
  const data =  [
    [
      'Jun 17',
      1649
    ],
    [
      'Jun 18',
      6826
    ],
    [
      'Jun 19',
      2921
    ],
    [
      'Jun 20',
      142
    ],
    [
      'Jun 21',
      371
    ],
    [
      'Jun 22',
      2645
    ],
    [
      'Jun 23',
      5393
    ],
    [
      'Jun 24',
      577
    ],
    [
      'Jun 25',
      3526
    ],
    [
      'Jun 26',
      5528
    ],
    [
      'Jun 27',
      1627
    ],
    [
      'Jun 28',
      5275
    ],
    [
      'Jun 29',
      182
    ],
    [
      'Jun 30',
      4987
    ],
    [
      'Jul 01',
      2902
    ],
    [
      'Jul 02',
      5417
    ],
    [
      'Jul 03',
      592
    ],
    [
      'Jul 04',
      4709
    ],
    [
      'Jul 05',
      3927
    ],
    [
      'Jul 06',
      1146
    ],
    [
      'Jul 07',
      1033
    ],
    [
      'Jul 08',
      552
    ],
    [
      'Jul 09',
      696
    ],
    [
      'Jul 10',
      91
    ],
    [
      'Jul 11',
      7510
    ],
    [
      'Jul 12',
      6768
    ],
    [
      'Jul 13',
      3258
    ],
    [
      'Jul 14',
      424
    ],
    [
      'Jul 15',
      1728
    ],
    [
      'Jul 16',
      3150
    ],
    [
      'Jul 17',
      5037
    ],
    [
      'Jul 18',
      1230
    ],
    [
      'Jul 19',
      3033
    ],
    [
      'Jul 20',
      813
    ],
    [
      'Jul 21',
      4557
    ],
    [
      'Jul 22',
      1934
    ],
    [
      'Jul 23',
      1040
    ],
    [
      'Jul 24',
      381
    ],
    [
      'Jul 25',
      3256
    ],
    [
      'Jul 26',
      2469
    ],
    [
      'Jul 27',
      2203
    ],
    [
      'Jul 28',
      427
    ],
    [
      'Jul 29',
      3124
    ],
    [
      'Jul 30',
      2066
    ],
    [
      'Jul 31',
      4017
    ]
  ]

  const dateList = data?.map(function (item: any[]) {
    return item[0]
  })

  const valueList = data?.map(function (item: any[]) {
    return item[1]
  })

  const [ops, setOps] = useState<any>()

  useEffect(() => {
    setOps({
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
      xAxis: [/*{
        data: dateList
      }, */
        {
          data: dateList,
          gridIndex: 1
        }
      ],
      yAxis: [{
        gridIndex: 1
      }],
      grid: [{}, {}],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    })
  }, [])

  return ops ? <ReactECharts option={ops} style={{ width: '100%', height: 200, }} /> : <div />
}

export default VariableAPY
