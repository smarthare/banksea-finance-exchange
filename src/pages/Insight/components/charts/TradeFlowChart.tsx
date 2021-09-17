import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionTradingFlowQuery } from '../../../../hooks/queries/insight/collection/useCollectionTradingFlowQuery'
import { numberWithCommas } from '../../../../utils'

const TradeFlowChart: React.FC<{ id?: string }> = ({ id }) => {
  const { data } = useCollectionTradingFlowQuery(id)

  const links = data?.linksList.sort((a, b) => b.value - a.value).slice(0, 20) ?? []
  const nodes = data?.nodesList.filter(({ name }) => {
    return links.find(link => link.source === name || link.target === name)
  }) ?? []

  const options = {
    darkMode: true,
    series: [
      {
        type: 'sankey',
        data: nodes,
        links,
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
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: (params: any) => {
            const { source, target, name } = params.data
            const { value } = params

            return source ? `
              <span style='margin-right: 20px'>${source} -> ${target}</span>
              <span>Ξ${numberWithCommas(value)}</span>
            ` : `
              <span style='margin-right: 20px'>${name}</span>
              <span>Ξ${numberWithCommas(value)}</span>
            `
          }
        }
      }
    ]
  }

  return (
    <div style={{ position: 'relative' }}>
      <ReactECharts option={options} />
    </div>
  )
}

export {
  TradeFlowChart
}
