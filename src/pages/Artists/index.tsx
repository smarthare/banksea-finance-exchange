import React from 'react'
import styled from 'styled-components'
import { Input, Select } from 'antd'
import { Upload, Checkbox, Button } from 'antd'
import UploadBtn from '@/assets/images/upload-button.png'
import PicIcon from '@/assets/images/picture-icon.png'

const { TextArea } = Input
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  progress: {
    strokeColor: {
      '0%': '#ffabe1',
      '50%': '#a685e2',
      '100%': '#7c6deb'
    },
    strokeWidth: 6,
    format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`
  }
}

type ArtistPageProps = {}
const ArtistPageContainer = styled.div`
  padding-top: 5.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 3rem;
    font-family: 'PingFang SC';
    font-weight: 500;
    color: #7c6deb;
    line-height: 4.2rem;
    padding-bottom: 4.7rem;
  }
`
const MainColumn = styled.div`
  width: 82.8rem;
  height: 164.7rem;
  background: #ffffff;
  border-radius: 5rem;
  padding: 3rem 8rem;

  .information {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    color: #7c6deb;
    line-height: 2.8rem;
    padding-top: 3rem;
  }

  .split-line {
    width: 66.8rem;
    height: 0.1rem;
    color: #e5e2fb;
    margin-top: 5.8rem;
  }
`

const ArtistForm = styled.div`
  .form-label {
    font-size: 1.6rem;
    font-weight: 500;
    color: #7c6deb;
    line-height: 2.2rem;
    padding-top: 2.5rem;
  }

  .text-area {
    &::placeholder {
      color: rgba(124, 109, 235, 0.5) !important;
    }

    width: 66.8rem !important;
    height: 10rem !important;
    background: #e5e2fb !important;
    border-radius: 1rem !important;
    border: 0.1rem solid #7c6deb !important;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: rgba(124, 109, 235, 1) !important;
    line-height: 2rem !important;
  }
`

const FormValue = styled.div`
  padding-top: 1rem;

  .ant-input {
    &::placeholder {
      color: rgba(124, 109, 235, 0.5);
    }
    width: 66.8rem !important;
    height: 5rem !important;
    background: #e5e2fb !important;
    border-radius: 1rem !important;
    border: 0.1rem solid #7c6deb !important;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: rgba(124, 109, 235, 1) !important;
    line-height: 2rem !important;
  }
`
const Selector = styled(Select)`
  .ant-select-selector {
    width: 16.4rem !important;
    height: 5rem !important;
    background: #e5e2fb !important;
    border-radius: 1rem !important;
    border-color: #7c6deb !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: #7c6deb !important;
    line-height: 2rem !important;
    padding-right: 5rem !important;
  }
  .ant-select-arrow {
    padding-top: 0.5rem;
  }
`
const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3.7rem;

  .upload-border {
    width: 30.2rem;
    height: 38.5rem;
    background: #e5e2fb;
    border-radius: 1rem;
    border: 0.2rem solid rgba(124, 109, 235, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .tip {
      font-size: 1.4rem;
      font-weight: 500;
      color: #7c6deb;
      line-height: 2rem;
      opacity: 0.5;
      filter: alpha(opacity=50); /* IE8 及其更早版本 */
    }
  }
`
const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .text {
    width: 54.6rem;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 6.4rem;
  }

  .text2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #7c6deb;
    line-height: 2.5rem;
    padding-top: 5rem;
  }
  .connect-btn {
    padding-top: 5.2rem;
    .ant-btn {
      width: 30.2rem;
      height: 6rem;
      background: #7c6deb;
      border-radius: 1rem;
    }
    .ant-btn > span {
      font-size: 1.6rem;
      font-weight: 500;
      color: #ffffff;
      line-height: 2.2rem;
    }
  }
`

function handleChange(value: any) {
  console.log(`selected ${value}`)
}

const ArtistPage: React.FC<ArtistPageProps> = ({}) => {
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <ArtistPageContainer>
      <div className="title">Banksy Artists</div>
      <MainColumn>
        <div className="information">1. Art Information</div>
        <ArtistForm>
          <div className="form-label">Artwork Type</div>
          <Selector defaultValue="1" style={{ paddingTop: '1.2rem' }} onChange={handleChange}>
            <Select.Option value="1">
              <div className="test" style={{ display: 'flex' }}>
                <img src={PicIcon} alt="pic" style={{ width: '1.8rem', height: '1.8rem', marginRight: '0.5rem' }} />
                Pictures
              </div>
            </Select.Option>
            <Select.Option value="2">GIF</Select.Option>
            <Select.Option value="3">Video</Select.Option>
            <Select.Option value="4">Audio</Select.Option>
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

          <TextArea rows={4} placeholder="Enter the Brief introduction" className="text-area" />
        </ArtistForm>
        <hr className="split-line" />
        <div className="information">2. Upload artwork image</div>
        <UploadContainer>
          <Upload {...props}>
            <div className="upload-border">
              <img src={UploadBtn} alt="upload-btn" style={{ width: '8.2rem' }} />
              <div className="tip">Support: png / jpg /</div>
              <div className="tip">Size: 10M/</div>
            </div>
          </Upload>
        </UploadContainer>
        <Announcement>
          <Checkbox>
            <div className="text">
              I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the
              artwork can be removed anytime if detected.
            </div>
          </Checkbox>
          <div className="text2">Mint an NFT charges 0.01BNB, please do not upload any sensitive content.</div>
          <div className="connect-btn">
            <Button>Connect Wallet</Button>
          </div>
        </Announcement>
      </MainColumn>
    </ArtistPageContainer>
  )
}

export default ArtistPage
