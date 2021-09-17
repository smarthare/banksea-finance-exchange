import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionPriceScatterQuery } from '@/hooks/queries/insight/collection/useCollectionPriceScatterQuery'

const PriceScatterChart: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const { data } = useCollectionPriceScatterQuery(contractAddress)

  const option = {
    darkMode: true,
    grid: {
      top: 28, bottom: 70, left: 66, right: 60
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      name: 'Value(ETH)',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#666',
          type: 'dotted'
        }
      }
    },
    series: [{
      data: data?.price.map(([timestamp, price, ...rest]) => ([timestamp * 1000, price, ...rest])).filter(([, price]) => price !== 0),
      type: 'scatter',
      symbolSize: 5
    }],
    tooltip: {
      triggerOn: 'mousemove',
      enterable: true,
      hideDelay: 500,
      formatter: (params: any) => {
        const [timestamp, value, tokenId, collectionSlug, imageUrl, tokenName] = params.data
        const date = new Date(timestamp)

        const link = `#/insight/${collectionSlug}/${tokenId}`

        return `
          <div>
            <a style='display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; color: black' href='${link}' target='_blank' rel='noreferrer' >
              <img src='${imageUrl}' style='width: 40px; height: 40px; border-radius: 20px; margin-right: 8px;' alt=''>
              <span>${tokenName}</span>
              <svg class='icon' style='width: 12px; height: 12px; margin-left: 10px' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'><path d='M576.366 235.081c39.35 0 71.095 32.183 71.095 71.753V531.75a28.745 28.745 0 0 1-28.672 28.745H605.11a28.745 28.745 0 0 1-28.672-28.745V342.747a35.694 35.694 0 0 0-35.548-35.84h-397.75a35.694 35.694 0 0 0-35.475 35.84v537.015c0 19.822 15.872 35.84 35.475 35.84h397.75c19.603 0 35.548-16.018 35.548-35.84 0-15.945 12.873-28.818 28.672-28.818h13.678c15.872 0 28.672 13.02 28.672 28.818v35.84a71.387 71.387 0 0 1-71.022 71.827H107.52a71.46 71.46 0 0 1-71.022-71.827V306.834c0-39.716 31.817-71.753 71.095-71.753z m374.272-198.51c19.602 0 35.474 16.092 35.474 35.84v641.024a71.387 71.387 0 0 1-71.095 71.827H446.245a71.46 71.46 0 0 1-71.095-71.827V495.91c0-17.847 14.482-32.33 32.256-32.33h6.583c17.773 0 32.182 14.483 32.182 32.33v181.833c0 19.895 15.946 35.913 35.548 35.913h397.75c19.603 0 35.475-16.092 35.475-35.84v-533.65a35.694 35.694 0 0 0-35.474-35.84H481.792c-19.675 0-35.547 16.018-35.474 35.84a32.33 32.33 0 0 1-32.256 32.329h-6.583a32.33 32.33 0 0 1-32.183-32.33v-35.84c0-39.716 31.744-71.826 71.022-71.826z'></path></svg>
            </a>
            <div>Ξ${value}&nbsp;&nbsp;&nbsp;(${date.toLocaleString()})</div>
          </div>
        `
      }
    },
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter',
        start: 85
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty',
        right: 0,
        end: 10
      }
    ]
  }

  return <ReactECharts option={option} />
}

export {
  PriceScatterChart
}
