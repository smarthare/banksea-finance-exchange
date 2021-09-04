import React from 'react'
import ReactECharts from 'echarts-for-react'

type CollectionsHearTrendChartProps = {
  collections: string[]
  chartData: [][]
}

const CollectionsHearTrendChart: React.FC<CollectionsHearTrendChartProps> = ({ chartData, collections }) => {
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
            { dimension: 'time', gte: 1950 },
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
      bottom: 20,
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
    xAxis: {
      type: 'category',
      name: 'Time',
      nameLocation: 'end'
    },
    yAxis: {
      name: 'Heat'
    },
    series: seriesList
  }

  return <ReactECharts option={option} />
}

export { CollectionsHearTrendChart }
