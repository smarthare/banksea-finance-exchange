import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionsHeatTrendQuery } from '../../../../hooks/queries/insight/overview/useCollectionsHeatTrendQuery'


const CollectionHeatCompositionChart: React.FC<{ seriesSlug?: string }> = ({ seriesSlug }) => {
  const { data } = useCollectionsHeatTrendQuery(seriesSlug)
  const row = data?.[0]
  const t1TurnoverRateScore = row?.t1TurnoverRateScore
  const t3TurnoverRateScore = row?.t3TurnoverRateScore
  const t7TurnoverRateScore = row?.t7TurnoverRateScore
  const t30TurnoverRateScore = row?.t30TurnoverRateScore
  const t90TurnoverRateScore = row?.t90TurnoverRateScore
  const t180TurnoverRateScore = row?.t180TurnoverRateScore
  const t365TurnoverRateScore = row?.t365TurnoverRateScore
  const time = row?.time.map(o => o * 1000)

  const legends = ['1 Days Turnover Rate', '3 Days Turnover Rate', '7 Days Turnover Rate',
    '30 Days Turnover Rate', '90 Days Turnover Rate', '180 Days Turnover Rate', '365 Days Turnover Rate']

  const buildSeries = (name: string, data?: any[]) => ({
    name,
    type: 'line',
    stack: 'Heat',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: data?.map((o, i) => ([time?.[i], o.toFixed(3)]))
  })

  const seriesByLegend = [
    { legend: '1 Days Turnover Rate', seriesData: t1TurnoverRateScore },
    { legend: '3 Days Turnover Rate', seriesData: t3TurnoverRateScore },
    { legend: '7 Days Turnover Rate', seriesData: t7TurnoverRateScore },
    { legend: '30 Days Turnover Rate', seriesData: t30TurnoverRateScore },
    { legend: '90 Days Turnover Rate', seriesData: t90TurnoverRateScore },
    { legend: '180 Days Turnover Rate', seriesData: t180TurnoverRateScore },
    { legend: '365 Days Turnover Rate', seriesData: t365TurnoverRateScore }
  ]


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
      top: 80,
      containLabel: true
    },
    xAxis: [{
      type: 'time',
    }],
    yAxis: [
      {
        type: 'value'
      }
    ],
    dataZoom: [
      { type: 'inside' }
    ],
    series: seriesByLegend.map(({ legend, seriesData }) => buildSeries(legend, seriesData))
  }

  return <ReactECharts option={options} />
}

export {
  CollectionHeatCompositionChart
}
