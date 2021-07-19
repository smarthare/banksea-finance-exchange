import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message } from 'antd'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'
import { fileCoinList, retweetCreat, retweetList, solanaList, voteCreate } from '../../apis/unsorted'
import VoteBanner from '@/assets/images/VoteImg/VoteBanner.png'

const VoteContainer = styled.div`
  min-height: 100vh;
  background: #090F22;

  @media screen and (min-width : 300px) and (max-width: 600px) {
    width: fit-content;
    background-color: #0B111E;
  }
`

const VoteContainerTop = styled.div`
  width: 100% ;
  height: 34.4rem;
  background: url(${VoteBanner}) no-repeat;
  background-size:100% 100%;
  position: relative;
  // margin-left: 20.2rem;
`

const ViewOperationSelect = styled.div`
  display: flex;
  float: right;

  div {
    width: 14.5rem;
    height: 7rem;
    background: #405099;
    color: #fff;
    font-weight: bolder;
    border-radius: 1rem;
    margin-left: 2rem;
    line-height: 10rem;
    text-align: center;
    margin-top: -3rem;
    cursor: pointer;
    transition: all 0.7s;
  }

  div:hover {
    margin-top: -2rem;
  }

  .tabs__link {
    background-color: #405099;
    color: #00FEFF;
    margin-top: -2rem;
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

const RegistrationContainer = styled(Form)`
  width: 116rem;
  display: flex;
  // justify-content: space-between;
  margin-top: 9.6rem;
  margin-left: calc((100% - 116rem) / 2);
`

const RegistrationItem = styled(Form.Item)`
  width: 20rem;
  margin-right: 4rem;

  p {
    width: 100%;
    height: 4rem;
    text-align: center;
    color: #9FC4FD;
    font-weight: bolder;
    margin-bottom: 2rem;
    font-size: 1.4rem;
  }

  .ant-input {
    width: 20rem;
    height: 4rem;
    background: #405099;
    color: #4470C1;
    font-weight: bold;
    border: 0.2rem solid #4470C1;
    border-radius: 0.8rem;
  }
`

const ConfirmButton = styled(Button)`
  width: 20rem;
  height: 4rem;
  background: #6C48FF;
  border-radius: 2rem;
  color: #fff;
  font-size: 1.4rem;
  margin-left: calc((100% - 20rem) / 2);
  margin-top: 2.1rem;
  border: none;
  font-weight: bolder;

  &.active,
  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const VotesContainerTable = styled.div`

  margin-top: 5rem;
  .votes {
    display: none;

    .search-box {
      width: 116rem;
      position: relative;
      margin-top: 2.1rem;
      margin-left: calc((100% - 116rem) / 2);
      display: flex;
      align-items: center;

      .search-box-text {
        position: absolute;
        right: 0;
        color: #9FC4FD;
        font-size: 1.4rem;
      }
    }
  }

  .votes.active {
    display: block;
  }
`

const SearchInput = styled(Input)`
  width: 40rem;
  height: 4rem;
  border: 2px solid #3658A7;
  background: none;
  border-radius: 4rem;
  position:absolute;
  right:0;
  margin-bottom:2rem;

  .ant-input {
    background: none;
    color: #3658A7;
    font-weight: bold;
  }
`

const VoteStatistics = styled.section`
  margin: 3rem calc((100% - 116rem) / 2);
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
    border: 1px solid #4470C1;
  }

  table thead {
    color: white;
    background-color: #405099;
  }

  table tbody {
    color: white;
    display: block;
    width: 100%;
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
    background: #405099;
  }

  table tbody tr:nth-of-type(even) {
    background: #405099;
  }

  table tbody tr td{
    border-bottom: none;
  }
  table tbody{
    &::-webkit-scrollbar {
        height: 5px;

    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #fff;
    }
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
        border-radius: 0;
        background: #405099;
        border: 1px solid #4470C1;
    }
}
`

type VotesType = {
  current: number
  onPressEnter: any
  retweetTable?: any
  init?: any
  filecoin?: any
  solana?: any
}

const TwitterVotesTable: React.FC<VotesType> = ({ current, onPressEnter, retweetTable }) => {
  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 1 && 'active')}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
          {/* <span className="search-box-text">Unit/USDC</span> */}
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Serial number</th>
                <th>twitterId</th>
                <th>retweetLink</th>
                <th>walletAddress</th>
                <th>referrerId(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                retweetTable?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.twitterId}</td>
                    <td>{item?.retweetLink}</td>
                    <td>{item?.walletAddress}</td>
                    <td>{item?.referrerId}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}

const TwitterVoteRegistration: React.FC<VotesType> = ({ current, onPressEnter, retweetTable, init }) => {

  const [twitterForm] = Form.useForm()

  const twitterFormValues = {
    twitterId: '',
    retweetLink: '',
    walletAddress: '',
    discordId: ''
  }
  const confirmTwitter = () => {
    twitterForm
      .validateFields()
      .then(values => {
        retweetCreat({
          twitterId: values?.twitterId,
          retweetLink: values?.retweetLink,
          walletAddress: values?.walletAddress,
          referrerId: values?.discordId
        }).then(() => {
          message.success('Form submit successfully!')
          init()
        })
      })
  }

  return (
    <Registration>
      <div className={clsx('registration', current === 1 && 'active')}>
        <RegistrationContainer form={twitterForm} initialValues={twitterFormValues} >
          <RegistrationItem>
            <p>Twitter ID</p>
            <Form.Item
              name="twitterId"
              rules={[{ required: true, message: 'Please fill out Discord ID or Twitter ID or Telegram ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Retweet Link</p>
            <Form.Item
              name="retweetLink"
              rules={[{ required: true, message: 'Please fill out Transaction record!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Wallet Address</p>
            <Form.Item
              name="walletAddress"
              rules={[{ required: true, message: 'Please fill out Wallet Address!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Referrer Discord ID Or Other ID</p>
            <Form.Item
              name="discordId"
              rules={[{ required: true, message: 'Please fill out Referrer Discord ID Or Other ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
        </RegistrationContainer>
        <ConfirmButton onClick={confirmTwitter}>Confirm</ConfirmButton>
      </div>
      <TwitterVotesTable current={current} retweetTable={retweetTable} onPressEnter={onPressEnter} />
    </Registration>
  )
}

const SolanaVotes: React.FC<VotesType> = ({ current, solana, onPressEnter }) => {
  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 2 && 'active')} style={{ marginTop:'12rem' }}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
          {/* <span className="search-box-text">Unit/USDC</span> */}
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Wallet Address</th>
                <th>Total Votes(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                solana?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item?.ranking}</td>
                    <td>{item?.source}</td>
                    <td>{item?.solanaVoting}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}

type Filecoin = {
  current: number,
  filecoin: Array<any>,
  onPressEnter: any
}

const FilecoinVotes: React.FC<VotesType> = ({ current, filecoin, onPressEnter }) => {

  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 0 && 'active')}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
          {/* <span className="search-box-text">Unit/USDC</span> */}
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Discord ID or Twitter ID or Telegram ID, Or Others</th>
                <th>Wallet Address</th>
                <th>Total Votes(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                filecoin?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item?.ranking}</td>
                    <td>{item?.discordId}</td>
                    <td>{item?.filecoinWalletAddress}</td>
                    <td>{item?.filecoinVotes}</td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}

const VoteRegistration: React.FC<VotesType> = ({ current, filecoin, onPressEnter, init }) => {

  const [form] = Form.useForm()

  const formInitialValues = {
    userId: '',
    record: '',
    votes: '',
    walletAddress: '',
    discordId: ''
  }

  const confirmCreat = () => {
    form.validateFields().then(values => {
      const confirmCreatForm = {
        discordId: values?.userId,
        transactionRecord: values?.record,
        votes: values?.votes,
        walletAddress: values?.walletAddress,
        referrerId: values?.discordId
      }

      voteCreate(confirmCreatForm).then(res => {
        if (res.data.data === '0') {
          message.success('This transaction record submit successfully. ')
        }
        else {
          message.success('This transaction record has been updated.')
        }
        init()
      })
    })
  }

  // @ts-ignore
  return (
    <Registration>
      <div className={clsx('registration', current === 0 && 'active')}>
        <RegistrationContainer form={form} initialValues={formInitialValues}>
          <RegistrationItem>
            <p>Discord ID or Twitter ID or Telegram ID, Or Others</p>
            <Form.Item
              name="userId"
              rules={[{ required: true, message: 'Please fill out Discord ID or Twitter ID or Telegram ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Transaction record</p>
            <Form.Item
              name="record"
              rules={[{ required: true, message: 'Please fill out Transaction record!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Votes</p>
            <Form.Item
              name="votes"
              rules={[{ required: true, message: 'Please fill out Votes!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Wallet Address</p>
            <Form.Item
              name="walletAddress"
              rules={[{ required: true, message: 'Please fill out Wallet Address!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <p>Referrer Discord ID Or Other ID</p>
            <Form.Item
              name="discordId"
              rules={[{ required: true, message: 'Please fill out Referrer Discord ID Or Other ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
        </RegistrationContainer>
        <ConfirmButton onClick={confirmCreat}>Confirm</ConfirmButton>
      </div>
      <FilecoinVotes current={current} filecoin={filecoin} onPressEnter={onPressEnter} />
    </Registration>
  )
}

const VotePage: React.FC = () => {

  const [current, setCurrent] = useState(0)

  const [searchKey, setSearchKey] = useState<any>()

  const [filecoin, setFilecoin] = useState<any>()

  const [solana, setSolana] = useState<any>()

  const [retweetTable, setRetweetTable] = useState<any>()

  const tabs = [ 'Filecoin Votes','Retweet', 'Solana Votes']


  const init = useCallback(async (searchKey: any) => {
    if (current === 0) {
      await fileCoinList({
        searchKey: searchKey
      }).then((res: any) => {
        setFilecoin(res.data.data)
      })
    }
    if (current === 1) {
      await retweetList({
        searchKey: searchKey
      }).then((res: any) => {
        setRetweetTable(res.data.data)
      })
    }
    if (current === 2) {
      await solanaList({
        searchKey: searchKey
      }).then((res: any) => {
        setSolana(res.data.data)
      })
    }
  },[current, searchKey])

  useEffect(() => {
    init(searchKey)
  },[init])

  const onPressEnter = (e: any) => {
    setSearchKey(e.target.attributes[2].value)
    init(e.target.attributes[2].value)
  }


  return (
    <VoteContainer>
      <VoteContainerTop />
      <ViewOperationSelect>
        {
          tabs.map((item: string, index: number) => (
            <div
              className={clsx(index === current && 'tabs__link')}
              onClick={() => setCurrent(index)}
              key={index}
            >
              {item}
            </div>
          ))
        }
      </ViewOperationSelect>
      <VoteRegistration current={current} filecoin={filecoin} onPressEnter={onPressEnter} init={init} />
      <TwitterVoteRegistration current={current} retweetTable={retweetTable} onPressEnter={onPressEnter} init={init} />
      <SolanaVotes current={current} solana={solana} onPressEnter={onPressEnter} />
    </VoteContainer>
  )
}

export default VotePage

{/*<JoinBanksyText>*/}
{/*  Welcome to join Bansky community!<br />*/}
{/*  Discord：https://discord.gg/NdRGt4BDFe<br />*/}
{/*  Twitter: https://twitter.com/banksy_finance<br />*/}
{/*  Telegram: https://t.me/Banskyfinance<br />*/}
{/*  Facebook: https://www.facebook.com/Banksy-Finance-107964618196801*/}
{/*</JoinBanksyText>*/}
{/*<RoleDescription>*/}
{/*  All your votes for Banksy can be added for a higher level Role and more airdrops!*/}
{/*  Please make sure your information is correct before confirming. Thank you!!Special Roles in the Discord server.<br />*/}
{/*  - Role OG, at least 1USDC of total votes, can get the OG Role.<br />*/}
{/*  - Role Silver, at least 5 USDC of total votes, can get the Silver Role.<br />*/}
{/*  - Role Gold, at least 15 USDC of total votes, can get the Gold Role.<br />*/}
{/*  - Role Platinum, at least 20USDC of total votes, can get the Platinum Role.<br />*/}
{/*  - Role Diamond, at least 50USDC of total votes, can get the Diamond Role.<br />*/}
{/*  - Role Hero, at least 80 USDC of total votes, can get the Hero Role.<br />*/}
{/*  - Role Hunter, for inviting members at least 50. Please invite members in by sharing the invite links from the server created by yourself.<br />*/}
{/*  - Role Rare, for voting referrer at least 15 valid votes. Please make sure voters apply your Discord ID in the form.*/}
{/*</RoleDescription>*/}
