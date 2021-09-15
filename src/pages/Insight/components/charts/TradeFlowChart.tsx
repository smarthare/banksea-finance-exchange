import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useCollectionTradingFlowQuery } from '../../../../hooks/queries/insight/collection/useCollectionTradingFlowQuery'

const TradeFlowChart: React.FC<{ id?: string }> = ({ id }) => {
  const { data } = useCollectionTradingFlowQuery(id)

  const links = data?.linksList.sort((a, b) => b.value - a.value).slice(0, 20) ?? []
  const nodes = data?.nodesList.filter(({ name }) => {
    return links.find(link => link.source === name || link.target === name)
  }) ?? []

  // const nodes = data?.nodesList
  //   .map(({ name }) => {
  //     const inValue = data?.linksList
  //       .filter(({ target }) => name === target)
  //       .reduce(
  //         (previousValue: number, currentValue) => previousValue + currentValue.value
  //         , 0
  //       )
  //
  //     // const outValue = data?.linksList
  //     //   .filter(({ source }) => name === source)
  //     //   .reduce(
  //     //     (previousValue: number, currentValue) => previousValue + currentValue.value
  //     //     , 0
  //     //   )
  //
  //     return {
  //       inValue,
  //       // outValue,
  //       name
  //     }
  //   })
  //   .filter(o => o.inValue > 0)
  //   .map(({ name }) => ({ name }))
  //   ?? []

  // nodes.forEach(node => {
  //   console.log('当前node', node)
  //   const associatedLinks = data?.linksList.filter(({ target }) => target === node.name).sort((a, b) => b.value - a.value).slice(0 , 20) ?? []
  //   console.log('关联的链接数：', associatedLinks.length, associatedLinks)
  //   console.log('新的链接数：',
  //     associatedLinks
  //       .map(link => ({ name: link.source }))
  //       .filter(o => !nodes.map(({ name }) => name).includes(o.name))
  //       .length
  //   )
  // })

  // console.log(nodes)

  // const links = data?.linksList
  //   .filter(({ source, target }) => nodes?.find(({ name }) => name === source || name === target)) ?? []

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
