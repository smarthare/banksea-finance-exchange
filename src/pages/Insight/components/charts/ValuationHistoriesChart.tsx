import React from 'react'
import ReactECharts from 'echarts-for-react'
import { AiValuation } from '@/hooks/queries/insight/token/useTokenValuationBaseInfoQuery'
import { numberWithCommas, simplifyNumber } from '../../../../utils'

const ValuationHistoriesChart: React.FC<{ valuations?: AiValuation[] }> = ({ valuations }) => {
  const options = {
    darkMode: true,
    grid: { top: 32, right: 48, bottom: 24, left: 48 },
    legend: {
      data: ['Transaction Price', 'AI Valuation'],
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (v: any) => {
        const valuation: AiValuation = v[0].data

        const dimensions = Object.keys(valuation)
          .filter(key =>
            Object.keys(valuation).includes(`${key}ChangeRate`)
            && /Score$/.test(key)
            && !/t3\D|t180|t36|t90/.test(key)
          )
          .map(key => {
            const change = Object.entries(valuation).find(([_key]) => _key === `${key}ChangeRate`)?.[1] * 100

            return `
              <div style='display: flex; justify-content: space-between;'>
                <span>
                    ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/T(\d+)/, (str, day) => `${day} Day${+day > 1 ? 's' : ''}`)}
                </span>
                <span>
                  <span>${numberWithCommas(Object.entries(valuation).find(([_key]) => _key === key)?.[1])}</span>
                  <span style='color: ${change && change < 0 ? 'rgb(227,76,69)' : 'rgb(40,167,69)'}'>
                    ${numberWithCommas(change ?? 0, 2, true)}%
                  </span>
                </span>
              </div>
            `
          })
          .join('')

        return `
          <div style='width: 400px;'>
            <div style='margin-bottom: 10px'>Time: ${v[0].axisValueLabel}</div>

            <div style='display: flex; justify-content: space-between;'>
              <span>${v[0].marker}Transaction Price</span>
              <span>
                 <span>Ξ${simplifyNumber(valuation.lastPrice)}</span>
                  <span style='color: ${valuation.lastPriceChangeRate && valuation.lastPriceChangeRate < 0 ? 'rgb(227,76,69)' : 'rgb(40,167,69)'}'>
                    ${numberWithCommas((valuation.lastPriceChangeRate ?? 0) * 100, 2, true)}%
                </span>
              </span>
             </div>

             <div style='display: flex; justify-content: space-between;'>
              <span>${v[1].marker}AI Valuation</span>
               <span>
                 <span>Ξ${simplifyNumber(valuation.valuation)}</span>
                  <span style='color: ${valuation.valuationChangeRate && valuation.valuationChangeRate < 0 ? 'rgb(227,76,69)' : 'rgb(40,167,69)'}'>
                    ${numberWithCommas((valuation.valuationChangeRate ?? 0) * 100, 2, true)}%
                </span>
              </span>
             </div>

             <div style='margin: 10px 0'>
              <div style='border: 1px gray dashed; height: 0'></div>
             </div>

              ${dimensions}
          </div>
        `
      }
    },
    dataset: {
      source: valuations?.map(o => ({ ...o, time: o.valuationTime * 1000 })) ?? []
    },
    color: ['#FFEDD3', '#FF5C58'],
    xAxis: {
      // type: 'category',
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
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }],
    series: [
      {
        name: 'Transaction Price',
        type: 'scatter',
        smooth: true,
        encode: {
          x: 'time',
          y: 'lastPrice'
        },
        symbolSize: 15
      },
      {
        name: 'AI Valuation',
        type: 'line',
        smooth: true,
        encode: {
          x: 'time',
          y: 'valuation'
        }
      }
    ]
  }

  return (<ReactECharts option={options} />)
}

export {
  ValuationHistoriesChart
}
