import React from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import Page from '../../components/coinEcharts'

const MyDashboardContainer = styled.div`
  display: none;

  &.active {
    display: block;
  }
`

const MyDashboardPage:React.FC<{ current: number }> = ({ current }) => {
  return (
    <MyDashboardContainer className={clsx(current === 1 && 'active')}>
      <Page />
    </MyDashboardContainer>
  )
}

export default MyDashboardPage
