import React from 'react'
import ReactECharts from 'echarts-for-react'

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
            // { dimension: 'time', gte: 1950 },
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
      }
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
      source: chartData
    }].concat(datasetWithFilters),
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
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
