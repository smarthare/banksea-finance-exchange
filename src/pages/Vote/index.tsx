import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input } from 'antd'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'

const VoteContainer = styled.div`
  min-height: 100vh;
`

const VoteContainerTop = styled.div`
  height: 34.4rem;
  border: 1px solid gray;
  position: relative;

  .vote-Top-bottom {
    display: flex;
    position: absolute;
    bottom: 1.1rem;
    right: 1rem;

    Button {
      width: 14.5rem;
      height: 4rem;
      background: #7C6DEB;
      border: none;
      border-radius: 4rem;
      color: #fff;
      font-size: 1.4rem;
      margin-left: 2rem;
    }

    .tabs__link {
      background-color: #7240CB;
      color: #ffffff;
    }
  }
`

const Registration = styled.div`

  .registration {
    display: none;
  }

  .registration.active {
    display: block;
  }
`

const RegistrationContainer = styled.div`
  width: 116rem;
  display: flex;
  justify-content: space-between;
  margin-top: 2.6rem;
  margin-left: calc((100% - 93.8rem) / 2);

  .registration-item {
    width: 20rem;

    p {
      width: 100%;
      height: 4rem;
      text-align: center;
      color: #7240CB;
      margin-bottom: 2rem;
      font-size: 1.4rem;
    }

    .ant-input {
      width: 20rem;
      height: 4rem;
      background-color: #e5e2fb;
      color: #7c6deb;
      font-weight: bold;
      border-color: #7c6deb;
      border-radius: 4rem;
    }
  }
`

const ConfirmButton = styled(Button)`
  width: 20rem;
  height: 4rem;
  background: #7240CB;
  border-radius: 2rem;
  color: #fff;
  font-size: 1.4rem;
  margin-left: calc((100% + 0.2rem) / 2);
  margin-top: 4.1rem;
  border: none;

  &.active,
  &:hover {
    background: #7240CB;
    color: #fff;
  }
`

const JoinBanksyText = styled.p`
  margin-top: 3.7rem;
  color: #666666;
  font-size: 1.4rem;
  margin-left: calc((100% - 93.8rem) / 2);
`

const RoleDescription = styled.p`
  margin-top: 2rem;
  color: #666666;
  font-size: 1.4rem;
  margin-left: calc((100% - 93.8rem) / 2);
`

const SolanaVotesContainer = styled.div`

  .solanaVotes {
    display: none;

    .search-box {
      width: 116rem;
      position: relative;
      margin-top: 2.1rem;
      margin-left: calc((100% - 93.8rem) / 2);
      display: flex;
      align-items: center;

      .search-box-text {
        position: absolute;
        right: 0;
        color: #7240CB;
        font-size: 1.4rem;
      }
    }
  }

  .solanaVotes.active {
    display: block;
  }
`

const SearchInput = styled(Input)`
  width: 40rem;
  height: 4rem;
  border-color: #7240CB;
  background: none;
  border-radius: 4rem;

  .ant-input {
    background: none;
    color: #7240CB;
    font-weight: bold;
  }
`

const VoteStatistics = styled.section`
  margin: 3rem calc((100% - 93.8rem) / 2);
  width: 116rem;

  table {
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
  }

  table caption{
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 50px;
  }

  table th, table td {
    height: 5.1rem;
    text-align: center;
  }

  table thead {
    color: white;
    background-color: #A277F0;
  }

  table tbody {
    color: white;
    display: block;
    width: calc(100% + 8px);
    height: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  table thead tr, table tbody tr, table tr {
    box-sizing: border-box;
    table-layout: fixed;
    display: table;
    width: 116rem;
  }

  table tbody tr:nth-of-type(odd) {
    background: #B791FA;
  }

  table tbody tr:nth-of-type(even) {
    background: #B791FA;
  }

  table tbody tr td{
    border-bottom: none;
  }
`


const VoteRegistration: React.FC<{current: number}> = ({ current }) => {
  return (
    <Registration>
      <div className={clsx('registration', current === 0 && 'active')}>
        <RegistrationContainer>
          <div className="registration-item">
            <p>Discord ID or Twitter ID or Telegram ID, Or Others</p>
            <Input />
          </div>
          <div className="registration-item">
            <p>Transaction record</p>
            <Input />
          </div>
          <div className="registration-item">
            <p>Votes</p>
            <Input />
          </div>
          <div className="registration-item">
            <p>Wallet Address</p>
            <Input />
          </div>
          <div className="registration-item">
            <p>Referrer Discord ID Or Other ID</p>
            <Input />
          </div>
        </RegistrationContainer>
        <ConfirmButton>Confirm</ConfirmButton>
        <JoinBanksyText>
          Welcome to join Bansky community!<br />
          Discord：https://discord.gg/NdRGt4BDFe<br />
          Twitter: https://twitter.com/banksy_finance<br />
          Telegram: https://t.me/Banskyfinance<br />
          Facebook: https://www.facebook.com/Banksy-Finance-107964618196801
        </JoinBanksyText>
        <RoleDescription>
          All your votes for Banksy can be added for a higher level Role and more airdrops!
          Please make sure your information is correct before confirming. Thank you!!Special Roles in the Discord server.<br />
          - Role OG, at least 1USDC of total votes, can get the OG Role.<br />
          - Role Silver, at least 5 USDC of total votes, can get the Silver Role.<br />
          - Role Gold, at least 15 USDC of total votes, can get the Gold Role.<br />
          - Role Platinum, at least 20USDC of total votes, can get the Platinum Role.<br />
          - Role Diamond, at least 50USDC of total votes, can get the Diamond Role.<br />
          - Role Hero, at least 80 USDC of total votes, can get the Hero Role.<br />
          - Role Hunter, for inviting members at least 50. Please invite members in by sharing the invite links from the server created by yourself.<br />
          - Role Rare, for voting referrer at least 15 valid votes. Please make sure voters apply your Discord ID in the form.
        </RoleDescription>
      </div>
    </Registration>
  )
}

const SolanaVotes: React.FC<{current: number}> = ({ current }) => {


  return (
    <SolanaVotesContainer>
      <div className={clsx('solanaVotes', current === 1 && 'active')}>
        <div className="search-box">
          <SearchInput prefix={<SearchOutlined style={{ color: '#7C6DEB', width: '1.5rem' }} />} />
          <span className="search-box-text">Unit/USDC</span>
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Discord ID or Twitter ID or Telegram ID, Or Others</th>
                <th>Wallet Address</th>
                <th>Solana Votes</th>
                <th>Filecoin Votes</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>*/}
              {/*  <td>001</td>*/}
              {/*  <td>Name</td>*/}
              {/*  <td>28</td>*/}
              {/*  <td>女</td>*/}
              {/*  <td>Mobile</td>*/}
              {/*  <td>Mobile</td>*/}
              {/*</tr>*/}
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </SolanaVotesContainer>
  )
}


const VotePage: React.FC = () => {

  const [current, setCurrent] = useState(0)

  const tabs = ['Vote Registration', 'Solana Votes', 'Filection Votes', 'Leader Board']

  return (
    <VoteContainer>
      <VoteContainerTop>
        <div className="vote-Top-bottom">
          {
            tabs.map((item: string, index: number) => (
              <Button
                className={clsx(index === current && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </Button>
            ))
          }
        </div>
      </VoteContainerTop>
      <VoteRegistration current={current} />
      <SolanaVotes current={current} />
    </VoteContainer>
  )
}

export default VotePage
