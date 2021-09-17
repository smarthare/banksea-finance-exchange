import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionTradingFlowQuery } from '@/hooks/queries/insight/collection/useCollectionTradingFlowQuery'
import { numberWithCommas } from '@/utils'
import { useCollectionTradingFlowCountQuery } from '@/hooks/queries/insight/collection/useCollectionTradingFlowCountQuery'

const TradeFlowChart: React.FC<{ id?: string, assetContractAddress: string }> = ({ id, assetContractAddress }) => {
  const { data } = useCollectionTradingFlowQuery(id)

  const links = data?.linksList.sort((a, b) => b.value - a.value).slice(0, 20) ?? []
  const nodes = data?.nodesList.filter(({ name }) => {
    return links.find(link => link.source === name || link.target === name)
  }) ?? []

  const [source, setSource] = useState<string>()
  const [target, setTarget] = useState<string>()

  const { data: count, isLoading: countLoading } = useCollectionTradingFlowCountQuery({
    source, target, assetContractAddress
  })

  const options = {
    darkMode: true,
    tooltip: {
      trigger: 'item',
    },
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
          formatter: (params: any) => {
            const { source, target, name } = params.data
            const { value } = params

            if (source && target) {
              setSource(source)
              setTarget(target)
            }

            return source ? `
              <span style='margin-right: 20px'>${source} -> ${target}</span>
              <span style='margin-right: 20px'>Transaction Count: ${countLoading ? 'loading...' : count}</span>
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
    <ReactECharts option={options} />
  )
}

export {
  TradeFlowChart
}
