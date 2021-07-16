import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

const VariableAPY: React.FC = () => {
  const data =  [
    [
      'Jun 17',
      399161649
    ],
    [
      'Jun 18',
      410138826
    ],
    [
      'Jun 19',
      206872921
    ],
    [
      'Jun 20',
      130269142
    ],
    [
      'Jun 21',
      30250371
    ],
    [
      'Jun 22',
      322578645
    ],
    [
      'Jun 23',
      242255393
    ],
    [
      'Jun 24',
      24380577
    ],
    [
      'Jun 25',
      347173526
    ],
    [
      'Jun 26',
      359535528
    ],
    [
      'Jun 27',
      161871627
    ],
    [
      'Jun 28',
      15565275
    ],
    [
      'Jun 29',
      322070182
    ],
    [
      'Jun 30',
      142477987
    ],
    [
      'Jul 01',
      344942902
    ],
    [
      'Jul 02',
      399675417
    ],
    [
      'Jul 03',
      255410592
    ],
    [
      'Jul 04',
      80242709
    ],
    [
      'Jul 05',
      323300927
    ],
    [
      'Jul 06',
      188601146
    ],
    [
      'Jul 07',
      162100433
    ],
    [
      'Jul 08',
      37933552
    ],
    [
      'Jul 09',
      427329696
    ],
    [
      'Jul 10',
      207972091
    ],
    [
      'Jul 11',
      143627510
    ],
    [
      'Jul 12',
      81667768
    ],
    [
      'Jul 13',
      324434258
    ],
    [
      'Jul 14',
      220940424
    ],
    [
      'Jul 15',
      66719728
    ],
    [
      'Jul 16',
      427138150
    ],
    [
      'Jul 17',
      185505037
    ],
    [
      'Jul 18',
      21014230
    ],
    [
      'Jul 19',
      378983033
    ],
    [
      'Jul 20',
      29959813
    ],
    [
      'Jul 21',
      204846557
    ],
    [
      'Jul 22',
      26909934
    ],
    [
      'Jul 23',
      281988040
    ],
    [
      'Jul 24',
      405770381
    ],
    [
      'Jul 25',
      29039256
    ],
    [
      'Jul 26',
      102392469
    ],
    [
      'Jul 27',
      152274203
    ],
    [
      'Jul 28',
      258052427
    ],
    [
      'Jul 29',
      200203124
    ],
    [
      'Jul 30',
      274072066
    ],
    [
      'Jul 31',
      250740171
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
