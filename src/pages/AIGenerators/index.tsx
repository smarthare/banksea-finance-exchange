import React, { useState } from 'react'
import styled from 'styled-components'
import { Carousel, Button,Image,Checkbox,Upload  } from 'antd'
import img1 from '@/assets/images/AIGeneratorsImg/1.jpg'
import img2 from '@/assets/images/AIGeneratorsImg/2.jpg'
import Plus from '@/assets/images/AIGeneratorsImg/plus.png'
import UploadIcn from '@/assets/images/AIGeneratorsImg/upload.png'
import DownArrow from '@/assets/images/AIGeneratorsImg/arrow-down.png'


const AIGeneratorsContainer = styled.div`
  font-family: 'PingFang SC';
  padding: 5rem 11.2rem;
`

const MainCarousel = styled.div`


  .top-area {
    width: 82.8rem;
    height: 23.2rem;
    background: url(${require('../../assets/images/AIGeneratorsImg/generatorsBG.png').default});
    background-size: contain;
  }

  .bottom-area {
    width: 82.8rem;
    height: 12rem;
    background-image: linear-gradient(#3F47C2,#7C6DEB);
  }

`
const GeneratorTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const GeneratorBody = styled.div`
  padding: 1.8rem 14rem;

  .head {
    display: flex;
    flex-direction: column;

    .title {
      flex-direction: column;
      font-size: 1.8rem;
      font-weight: 500;
      color: #7C6DEB;
      line-height: 2.5rem;
    }

    .split-border {
      width: 20px;
      height: 5px;
      background: #00FFFF;
      border-radius: 3px;
      margin-top: 0.5rem;
    }
  }
  .gene-detail {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

  }

  .plus-icon {
    display: flex;
    justify-content: center;
  }

  .nft-detail {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 1rem;

  }
`

const GeneratorFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`

const GenerateButton = styled(Button)`
  width: 405px;
  height: 50px;
  background: #7C6DEB;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 22px;
`

const AssetUploadContainer = styled.div`
  width: 192px;
  height: 130px;
  background: #E5E2FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .upload-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1.4rem;

    font-size: 1.4rem;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 2rem;
  }
`

const GenerateContainer = styled.div`
  margin-top: 2.5rem;
.generate-border {
  width: 99.4rem;
  height: 42.2rem;
  background-image: linear-gradient(#2A009A,#2B00A0,#15044F);
  border-radius: 1rem;
  padding: 3.5rem 5.9rem;
}
`

const GeneItemList: React.FC = () => {

  const SelectBtn: React.FC = () => {
    return (
      <div
        style={{
          position:'absolute',
          width: '23',
          height:' 23',
          top: '1rem',
          left: '16rem',
          zIndex: 1,
          opacity:0.7
        }}

      >
        <Checkbox />
      </div>
    )
  }
  return (
    <div style={{
      position:'relative',
      top:'1rem',
      marginRight:'1.5rem'
    }}
    >
      <Image
        width={192}
        height={130}
        src={img1}
        style={{ objectFit:'cover',cursor:'pointer' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const NFTItemList: React.FC = () => {

  const SelectBtn: React.FC = () => {
    return (
      <div
        style={{
          position:'absolute',
          width: '23',
          height:' 23',
          top: '1rem',
          left: '16rem',
          zIndex: 1,
          opacity:0.7
        }}

      >
        <Checkbox />
      </div>
    )
  }
  return (
    <div style={{
      position:'relative',
      marginRight:'1.5rem'
    }}
    >
      <Image
        width={192}
        height={130}
        src={img2}
        style={{ objectFit:'cover',cursor:'pointer' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const AssetUpload : React.FC = () => {
  return (
    <AssetUploadContainer>
      <Upload>
        <div className="upload-icon">
          <img src={UploadIcn} style={{ width:'5.5rem' }} />
          <div style={{ marginTop:'1.2rem' }}>
            上传/购买 NFT
          </div>
        </div>
      </Upload>
    </AssetUploadContainer>
  )
}

const SelectedNft : React.FC = () =>{
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',

    }}
    >
      <div style={{
        width: '21.2rem',
        height: '15rem',
        background: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
        <Image
          width={192}
          height={130}
          src={img2}
          style={{ objectFit:'cover', cursor:'pointer', }}
          preview={false}
        />
      </div>
      <div className="selected-info"
        style={{
          fontSize: '1.4rem',
          fontWeight: 400,
          color:'white',
          lineHeight: '2rem',

        }}
      >
        Select Style NFT
      </div>

    </div>

  )
}


const AIGenerators : React.FC = () => {
  return (
    <AIGeneratorsContainer>
      <GeneratorTop>
        <MainCarousel>
          <div className="top-area" />
          <div className="bottom-area" />
        </MainCarousel>
      </GeneratorTop>
      <GeneratorBody>
        <div className="head">
          <div className="title">Style Gene</div>
          <div className="split-border" />
        </div>
        <div className="gene-detail">
          <GeneItemList />
          <GeneItemList />
          <GeneItemList />
          <GeneItemList />
        </div>
        <div className="plus-icon">
          <img src={Plus} style={{ width:'2.6rem', marginTop:'3.1rem' }} />
        </div>
        <div className="head">
          <div className="title">My NFT</div>
          <div className="split-border" />
        </div>
        <div className="nft-detail">
          <NFTItemList />
          <NFTItemList />
          <NFTItemList />
          <AssetUpload />
        </div>
      </GeneratorBody>
      <GeneratorFooter>
        <GenerateButton >AI Generate</GenerateButton>
        <img src={DownArrow} style={{ width:'2.6rem', height:'3.2rem', marginTop:'0.6rem' }} />
        <GenerateContainer>
          <div className="generate-border" >
            <SelectedNft />
          </div>
        </GenerateContainer>
      </GeneratorFooter>
    </AIGeneratorsContainer>
  )
}


export default AIGenerators
