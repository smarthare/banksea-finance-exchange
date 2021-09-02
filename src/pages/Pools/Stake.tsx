import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import stateKSY from '../../assets/images/Pools/stateKSY.png'
import stateBPT from '../../assets/images/Pools/StateBPT.png'
import { useStakeUnderstandModal } from '../../hooks/modals/useStakeUnderstandModal'

const StakeMain = styled.div`
  width: 123rem;
  padding-top: 8rem;
  margin-left: calc((100% - 123rem) / 2);
  display: none;

  &.active {
    display: block;
  }
`

const StakeMainLeft = styled.div`
  width: 70rem;
  height: 60rem;
  background: #101D44;
  border-radius: 1.5rem;
  float: left;
`

const AreaTitle = styled.div`
  text-align: center;
  padding: 2rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const StakeMainText = styled.div`
  text-align: center;
  color: #90B3E9;
  font-size: 1.7rem;
  margin-top: 8rem;
`

const StakeMainPledge = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;

  .StakeMainPledge-item {
    width: 15rem;
    height: 18rem;
    background: #3658A7;
    border-radius: 1.5rem;

    &:nth-of-type(2) {
      margin-left: 5rem;
    }

    img {
      width: 6rem;
      height: 6rem;
      border-radius: 6rem;
      margin-left: 4.5rem;
      margin-top: 3rem;
    }

    div {
      text-align: center;
      color: #fff;
      font-size: 1.7rem;
      margin-top: 2rem;
    }
  }

  .stakeMain-item {
    width: 15rem;
    height: 18rem;
    border-radius: 1.5rem;
    background: #182C58;
    text-align: center;
    margin-top: 5rem;

    &:nth-of-type(2) {
      margin-left: 6rem;
    }

    .stakeMain-item-name {
      color: #fff;
      font-size: 2rem;
      font-weight: bolder;
      margin-top: 2rem;
    }

    .stakeMain-item-number {
      color: #00FAFC;
      font-size: 2rem;
      font-weight: bolder;
      margin-top: 1rem;
    }

    .stakeMain-item-value {
      color: #fff;
    }

    .stakeMain-item-button {
      width: 13rem;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      border-radius: 0.5rem;
      color: #fff;
      font-size: 1.4rem;
      background: #6C48FF;
      margin-left: calc((100% - 13rem) / 2);
      margin-top: 2rem;
      cursor: pointer;
    }
  }
`

const StakeMainRight = styled.div`
  width: 50.2rem;
  height: 60rem;
  background: #101D44;
  border-radius: 1.5rem;
  float: right;
`

const StakeMainRightContainer = styled.div`
  padding: 4rem 6rem;

  .container-item {
    display: flex;
    position: relative;
    margin-top: 2rem;

    .container-item-name {
      color: #fff;
      font-size: 1.8rem;
    }

    .container-item-value {
      color: #fff;
      font-weight: bolder;
      text-align: center;
      position: absolute;
      right: 0;

      div:nth-of-type(1) {
        font-size: 1.7rem;
      }

      div:nth-of-type(2) {
        font-size: 1.2rem;
      }
    }
  }
`

const StakePage: React.FC = () => {

  const [stakeCurrency, setStakeCurrency] = useState<any>()

  const { stakeUnderstandModal, openStakeUnderstandModal } = useStakeUnderstandModal(stakeCurrency)

  const toStake = (s: string) => {
    openStakeUnderstandModal()
    setStakeCurrency(s)
  }

  return (
    <StakeMain className={clsx('active')}>
      <StakeMainLeft>
        <AreaTitle>Safety pool</AreaTitle>
        <Line />
        <StakeMainText>
          You can either stake KSY or BPT<br />
          to secure the protocol
        </StakeMainText>
        <StakeMainPledge>
          <div className="StakeMainPledge-item" onClick={() => toStake('KSY')}>
            <img src={stateKSY} alt="Stake KSY" />
            <div>Stake KSY</div>
          </div>
          <div className="StakeMainPledge-item" onClick={() => toStake('BPT')}>
            <img src={stateBPT} alt="Stake KSY/ETH BPT" />
            <div>
              Stake<br />
              KSY/ETH BPT
            </div>
          </div>
        </StakeMainPledge>
      </StakeMainLeft>
      <StakeMainRight>
        <StakeMainPledge>
          <div className="stakeMain-item">
            <div className="stakeMain-item-name">KSY Staked</div>
            <div className="stakeMain-item-number">20.000</div>
            <div className="stakeMain-item-value">$123 USD</div>
            <div className="stakeMain-item-button">Activate Cooldown</div>
          </div>
          <div className="stakeMain-item">
            <div className="stakeMain-item-name">BPT Staked</div>
            <div className="stakeMain-item-number">15.000</div>
            <div className="stakeMain-item-value">$123 USD</div>
            <div className="stakeMain-item-button">Claim</div>
          </div>
        </StakeMainPledge>
        <StakeMainRightContainer>
          <div className="container-item">
            <div className="container-item-name">KSY per month</div>
            <div className="container-item-value">
              <div>112</div>
              <div>$10</div>
            </div>
          </div>
          <div className="container-item">
            <div className="container-item-name">Cooldown period</div>
            <div className="container-item-value">
              <div>10Days</div>
            </div>
          </div>
          <div className="container-item">
            <div className="container-item-name">Staking APR</div>
            <div className="container-item-value">
              <div>8.88%</div>
            </div>
          </div>
          <div className="container-item">
            <div className="container-item-name">Current max.Slashing</div>
            <div className="container-item-value">
              <div>20%</div>
            </div>
          </div>
        </StakeMainRightContainer>
      </StakeMainRight>
      {stakeUnderstandModal}
    </StakeMain>
  )
}

export default StakePage
