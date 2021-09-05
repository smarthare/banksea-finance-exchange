import React from 'react'
import ReactECharts from 'echarts-for-react'

type TradeFlowChartData = {
  nodes: { name: string }[]
  links: { source: string, target: string, value: number }[]
}

const TradeFlowChart: React.FC = () => {
  const { nodes, links } = require('../../../../assets/mock/transaction-flow.json') as TradeFlowChartData

  const options = {
    darkMode: true,
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        data: nodes,
        links: links,
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        label: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ]
  }

  return <ReactECharts option={options} />
}

export {
  TradeFlowChart
}
