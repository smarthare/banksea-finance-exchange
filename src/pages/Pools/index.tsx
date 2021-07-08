import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'

const PoolsContainer = styled.div`
  min-height: 100vh;
  margin-top: 6.4rem;
`

const PoolsContainerMenu = styled.div`
  height: 4rem;
  background: #0D1B34;
  border-bottom: 1px solid #4D4E52;
  display: flex;

  .container-menu-item {
    color: #9EA0A3;
  }
`

const PoolsPage:React.FC = () => {

  const [current, setCurrent] = useState<number>(0)

  const menuTabs = ['MARKE', 'MY DASHBOARD', 'DEPOSIT', 'BORROW', 'STAKE']

  return (
    <PoolsContainer>
      <PoolsContainerMenu>
        {
          menuTabs.map((item: string, index) => (
            <div
              className={clsx('container-menu-item', current === index && 'tabs__link')}
              onClick={() => setCurrent(index)}
              key={index}
            >
              {item}
            </div>
          ))
        }
      </PoolsContainerMenu>
    </PoolsContainer>
  )
}

export default PoolsPage
