import React from 'react'
import ReactECharts from 'echarts-for-react'
import { simplifyNumber } from '../../../../utils'

export type CollectionsHeatTrendChartProps = {
  collections: string[]
  chartData: Array<any>
}

const CollectionsHearTrendChart: React.FC<CollectionsHeatTrendChartProps> = ({ chartData, collections }) => {
  const datasetWithFilters: any = []
  const seriesList: any = []

  collections.forEach(collection => {
    const datasetId = 'dataset_' + collection
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'collection', '=': collection }
          ]
        }
      }
    })
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: collection,
      // endLabel: {
      //   show: true,
      //   formatter: function(params: any) {
      //     return params.value[3] + ': ' + params.value[0]
      //   }
      // },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'time',
        y: 'heat',
        label: ['collection', 'heat'],
        itemName: 'time',
        tooltip: ['heat']
      },
    })
  })

  const option = {
    darkMode: true,
    grid: {
      top: 30,
      bottom: 80,
      right: 48,
      left: 48
    },
    animationDuration: 6000,
    dataset: [{
      id: 'dataset_raw',
      source: chartData.map((row, index) => {
        if (index === 0) {
          return row
        } else {
          return [row[0], row[1], row[2] * 1000]
        }
      })
    }].concat(datasetWithFilters),
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
      formatter: (params: any) => {
        params.map((item: any) => `
          <div>${item.data[0]}: ${simplifyNumber(item.data[1])}</div>
        `)

        return `
          <div>
            <div>${new Date(params[0].data[2]).toLocaleString()}</div>
            ${params.map((item: any) => `
              <div>${item.data[0]}: ${simplifyNumber(item.data[1])}</div>
            `).join('')}
          <div/>
        `
      }
    },
    dataZoom: [{
      type: 'slider',
      start: 50,
      end: 100,
      top: 350
    }],
    xAxis: {
      type: 'time',
      name: 'Time',
      nameLocation: 'end'
    },
    yAxis: {
      name: 'Heat',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#666',
          type: 'dotted'
        }
      }
    },
    series: seriesList
  }

  return <ReactECharts option={option} style={{ height: '400px' }} />
}

export { CollectionsHearTrendChart }
