import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionsHeatTrendQuery } from '@/hooks/queries/insight/overview/useCollectionsHeatTrendQuery'
import { EChartsOption } from 'echarts-for-react/src/types'
import { numberWithCommas } from '@/utils'


const CollectionHeatCompositionChart: React.FC<{ seriesSlug?: string }> = ({ seriesSlug }) => {
  const { data } = useCollectionsHeatTrendQuery(seriesSlug)
  const row = data?.[0]
  const time = row?.time.map(o => o * 1000) ?? []

  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: (params: any) => {
        const [time, score, t1, t7, t30, t180] = params[0].data

        return `
          <div style='display: flex; flex-direction: column; align-content: flex-start; width: 250px'>
            <div>${new Date(time).toLocaleDateString()}</div>
            <div style='display: flex; justify-content: space-between;'>
              <span>${params[0].marker}Heat Score: </span>
              <span>${numberWithCommas(score)}</span>
            </div>

            <div style='margin: 10px 0'>
              <div style='border: 1px gray dashed; height: 0'></div>
            </div>

             <div style='display: flex; justify-content: space-between;'>
                <span>1 Day Turnover Rate:</span>
                <span>${(t1 * 100).toFixed(2)}%</span>
             </div>
             <div style='display: flex; justify-content: space-between;'>
                <span>7 Days Turnover Rate:</span>
                <span>${(t7 * 100).toFixed(2)}%</span>
             </div>
             <div style='display: flex; justify-content: space-between;'>
                <span>30 Days Turnover Rate:</span>
                <span>${(t30 * 100).toFixed(2)}%</span>
             </div>
             <div style='display: flex; justify-content: space-between;'>
                <span>180 Days Turnover Rate:</span>
                <span>${(t180 * 100).toFixed(2)}%</span>
             </div>
          <div/>
        `
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
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#666',
          type: 'dotted'
        }
      },
    }],
    dataset: {
      dimensions: ['time', 'heatScore', 't1TurnoverRate', 't7TurnoverRate', 't30TurnoverRate', 't180TurnoverRate', ],
      source: {
        ...row,
        time,
        heatScore: row?.heatScore.map(o => o * 100)
      }
    },
    dataZoom: [
      { type: 'inside', start: 80, end: 100 }
    ],
    series: [
      {
        name: 'Heat Score',
        type: 'line',
        smooth: true,
        encode: {
          x: 'time',
          y: 'heatScore'
        }
      }
    ],
  }

  return <ReactECharts option={options} />
}

export {
  CollectionHeatCompositionChart
}
