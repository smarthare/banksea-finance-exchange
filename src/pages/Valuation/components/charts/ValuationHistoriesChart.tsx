import React from 'react'
import ReactECharts from 'echarts-for-react'
import { OracleNftValuation } from '../../../../hooks/queries/insight/token/useTokenValuationBaseInfoQuery'
import { numberWithCommas, simplifyNumber } from '../../../../utils'


const ValuationHistoriesChart: React.FC<{valuations?: OracleNftValuation[]}> = ({ valuations }) => {
  const list: OracleNftValuation[] = []

  if (valuations) {
    const ONE_DAY = 1000 * 60 * 60 * 24
    const v = valuations[0]

    for (let i = 0; i < 10; i++) {
      list.push({
        ...v,
        createTime: v.createTime * 1000 + ONE_DAY * i,
        actualPriceEth: v.actualPriceEth * Math.random(),
        oracleValuationEth: v.oracleValuationEth * Math.random(),
        btcMarketIndexChange: 20 * (Math.random() - 0.5),
        nftMarketIndexChange: 20 * (Math.random() - 0.5),
        seriesMarketIndexChange: 20 * (Math.random() - 0.5),
        communityHeatIndexChange: 20 * (Math.random() - 0.5),
        fansLoyaltyIndexChange: 20 * (Math.random() - 0.5),
        typeHeatChange: 20 * (Math.random() - 0.5),
      })
    }
  }

  const options = {
    darkMode: true,
    grid: { top: 32, right: 48, bottom: 24, left: 48 },
    legend: {
      data: ['Actual Price', 'Oracle Valuation'],
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (v: any) => {
        const valuation: OracleNftValuation = v[0].data

        const colors = [
          '#cb997e',
          '#ddbea9',
          '#ffe8d6',
          '#b7b7a4',
          '#a5a58d',
          '#6b705c'
        ]

        const markerByColor = (color: string) => `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`

        const dimensions = [
          { name: 'BTC Market Index', value: valuation.btcMarketIndex, change: valuation.btcMarketIndexChange },
          { name: 'Type Heat', value: valuation.typeHeat, change: valuation.typeHeatChange },
          { name: 'NFT Market Index', value: valuation.nftMarketIndex, change: valuation.nftMarketIndexChange },
          { name: 'Collection Market Index', value: valuation.seriesMarketIndex, change: valuation.seriesMarketIndexChange },
          { name: 'Community Market Index', value: valuation.communityHeatIndex, change: valuation.communityHeatIndexChange },
          { name: 'Fans loyalty Index', value: valuation.fansLoyaltyIndex, change: valuation.fansLoyaltyIndexChange },
        ]

        return `
          <div style='width: 400px;'>
            <div style='margin-bottom: 10px'>Time: ${v[0].axisValueLabel}</div>

            <div style='display: flex; justify-content: space-between;'>
              <span>${v[0].marker}Actual Price</span>
              <span>Ξ${simplifyNumber(valuation.actualPriceEth)}</span>
             </div>

             <div style='display: flex; justify-content: space-between;'>
              <span>${v[1].marker}Oracle Valuation</span>
              <span>Ξ${simplifyNumber(valuation.oracleValuationEth)}</span>
             </div>

             <div style='margin: 10px 0'>
              <div style='border: 1px gray dashed; height: 0'></div>
             </div>

             ${dimensions.map((d, index) => `
               <div style='display: flex; justify-content: space-between;'>
                <span>${markerByColor(colors[index])} ${d.name}</span>
                <span>
                  <span>${numberWithCommas(d.value)}</span>
                  <span style='color: ${d.change && d.change < 0 ? 'rgb(227,76,69)': 'rgb(40,167,69)'}'>
                    ${d.change && d.change > 0 ? '+' : ''}${numberWithCommas(d.change ?? 0)}%
                    </span>
                </span>
               </div>
             `).join('')}
          </div>
        `
      }
    },
    dataset: {
      // dimensions: source[0],
      // source
      source: list
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        color: 'white'
      }
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        name: 'Price',
        nameTextStyle: {
          color: 'white'
        },
        axisLabel: {
          formatter: 'Ξ{value}',
          color: 'white'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dotted'
          }
        }
      }
    ],
    series: [
      {
        name: 'Actual Price',
        type: 'line',
        smooth: true,
        encode: {
          // x: 0,
          // y: 1,
          x: 'createTime',
          y: 'actualPriceEth'
        },
      },
      {
        name: 'Oracle Valuation',
        type: 'line',
        smooth: true,
        encode: {
          // x: 0,
          // y: 2,
          x: 'createTime',
          y: 'oracleValuationEth',
        },
      }
    ],
  }
  return (<ReactECharts option={options} />)
}

export {
  ValuationHistoriesChart
}
