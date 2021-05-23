import React from 'react'
import styled from 'styled-components'
import { Input, Select } from 'antd'

type ArtistPageProps = {}
const ArtistPageContainer = styled.div`
  padding-top: 5.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 30px;
    font-family: 'PingFang SC';
    font-weight: 500;
    color: #7c6deb;
    line-height: 42px;
    padding-bottom: 4.7rem;
  }
`
const MainColumn = styled.div`
  width: 82.8rem;
  height: 164.7rem;
  background: #ffffff;
  border-radius: 50px;
  padding: 3rem 8rem;

  .information {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: #7c6deb;
    line-height: 28px;
    padding-top: 3rem;
  }
`

const ArtistForm = styled.div`
  .form-label {
    font-size: 16px;
    font-weight: 500;
    color: #7c6deb;
    line-height: 22px;
  }
`

const FormValue = styled.div`
  padding-top: 1.2rem;
  padding-bottom: 2.5rem;

  .ant-input {
    width: 66.8rem !important;
    height: 5rem !important;
    background: #e5e2fb !important;
    border-radius: 1rem !important;
    border: 0.1rem solid #7c6deb !important;

    font-size: 14px !important;
    font-weight: 500 !important;
    color: #7c6deb !important;
    line-height: 20px !important;
  }
`
const Selector = styled(Select)`
  .ant-select-selector {
    width: 164px !important;
    height: 50px !important;
    background: #e5e2fb !important;
    border-radius: 10px !important;
    border-color: #7c6deb !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #7c6deb !important;
    line-height: 20px !important;
  }
`

const ArtistPage: React.FC<ArtistPageProps> = ({}) => {
  return (
    <ArtistPageContainer>
      <div className="title">Banksy Artists</div>
      <MainColumn>
        <div className="information">1. Art Information</div>
        <ArtistForm>
          <div className="form-label">Artwork Type</div>
          <Selector defaultValue={1}>
            <Select.Option value="1">Pictures</Select.Option>
            <Select.Option value="2">GIF</Select.Option>
            <Select.Option value="3">Video</Select.Option>
          </Selector>
          <div className="form-label">Artwork Name</div>
          <FormValue>
            <Input placeholder="Basic usage" />
          </FormValue>
          <div className="form-label">Artwork Name</div>
          <FormValue>
            <Input placeholder="Enter the artwork name" />
          </FormValue>
          <div className="form-label">Artist Name</div>
          <FormValue>
            <Input placeholder="Enter the artist name" />
          </FormValue>
          <div className="form-label">Social Media/Portfolio link</div>
          <FormValue>
            <Input placeholder="Personal website" />
          </FormValue>
          <div className="form-label">Brief Introduction</div>
          <FormValue>
            <Input placeholder="Enter the Brief introduction" />
          </FormValue>
        </ArtistForm>
      </MainColumn>
    </ArtistPageContainer>
  )
}

export default ArtistPage
