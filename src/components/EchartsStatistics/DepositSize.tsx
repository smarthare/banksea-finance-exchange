import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

const DepositSize:React.FC<{ depositStatistics: any }> = ({ depositStatistics }) => {
  const data =  [
    [
      'Jun 17',
      161649
    ],
    [
      'Jun 18',
      138826
    ],
    [
      'Jun 19',
      672921
    ],
    [
      'Jun 20',
      269142
    ],
    [
      'Jun 21',
      50371
    ],
    [
      'Jun 22',
      578645
    ],
    [
      'Jun 23',
      255393
    ],
    [
      'Jun 24',
      380577
    ],
    [
      'Jun 25',
      173526
    ],
    [
      'Jun 26',
      535528
    ],
    [
      'Jun 27',
      671627
    ],
    [
      'Jun 28',
      565275
    ],
    [
      'Jun 29',
      70182
    ],
    [
      'Jun 30',
      477987
    ],
    [
      'Jul 01',
      42902
    ],
    [
      'Jul 02',
      675417
    ],
    [
      'Jul 03',
      410592
    ],
    [
      'Jul 04',
      42709
    ],
    [
      'Jul 05',
      300927
    ],
    [
      'Jul 06',
      601146
    ],
    [
      'Jul 07',
      100433
    ],
    [
      'Jul 08',
      33552
    ],
    [
      'Jul 09',
      329696
    ],
    [
      'Jul 10',
      72091
    ],
    [
      'Jul 11',
      627510
    ],
    [
      'Jul 12',
      667768
    ],
    [
      'Jul 13',
      434258
    ],
    [
      'Jul 14',
      40424
    ],
    [
      'Jul 15',
      19728
    ],
    [
      'Jul 16',
      38150
    ],
    [
      'Jul 17',
      5037
    ],
    [
      'Jul 18',
      14230
    ],
    [
      'Jul 19',
      83033
    ],
    [
      'Jul 20',
      59813
    ],
    [
      'Jul 21',
      46557
    ],
    [
      'Jul 22',
      9934
    ],
    [
      'Jul 23',
      88040
    ],
    [
      'Jul 24',
      70381
    ],
    [
      'Jul 25',
      39256
    ],
    [
      'Jul 26',
      392469
    ],
    [
      'Jul 27',
      274203
    ],
    [
      'Jul 28',
      52427
    ],
    [
      'Jul 29',
      203124
    ],
    [
      'Jul 30',
      72066
    ],
    [
      'Jul 31',
      740171
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
        max: 600
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
      yAxis: [
        {
          gridIndex: 1
        }
      ],
      grid: [
        {
          top: '0',
          bottom: '0'
        },
        {
          width: 'auto',
          height: 'auto'
        }
      ],
      series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
      }]
    })
  }, [depositStatistics])

  return ops ? <ReactECharts option={ops} style={{ width: '100%', height: '240px' }} /> : <div />
}

export default DepositSize
