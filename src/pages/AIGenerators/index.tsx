import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Image as AntdImage, Upload } from 'antd'
import Plus from '@/assets/images/AIGeneratorsImg/plus.png'
import UploadIcn from '@/assets/images/AIGeneratorsImg/upload.png'
import DownArrow from '@/assets/images/AIGeneratorsImg/arrow-down.png'
import { usePersonalNfts } from '../../hooks/usePersonalNfts'
import { aiGeneratorFastStyle } from '../../apis/ai'

const AIGeneratorsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 82.8rem;

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
    background-image: linear-gradient(#3F47C2, #7C6DEB);
  }

`

const GeneratorTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GeneratorBody = styled.div`
  padding: 1.8rem 0;
  width: 82.8rem;

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

const GenerateResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  width: 99.4rem;
  height: 53.1rem;
  background-image: linear-gradient(#2A009A, #2B00A0, #15044F);
  border-radius: 1rem;
  padding: 3.5rem 5.9rem;
`

const NFTItem: React.FC<{ src: string }> = ({ src }) => {
  const SelectBtn: React.FC = () => {
    return (
      <div
        style={{
          position: 'absolute',
          width: '23',
          height: ' 23',
          top: '1rem',
          left: '16rem',
          zIndex: 1,
          opacity: 0.7
        }}

      >
        <Checkbox />
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative',
      marginRight: '1.5rem'
    }}
    >
      <AntdImage
        width={192}
        height={130}
        src={src}
        style={{ objectFit: 'cover', cursor: 'pointer' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const AssetUpload: React.FC = () => {
  return (
    <AssetUploadContainer>
      <Upload>
        <div className="upload-icon">
          <img src={UploadIcn} style={{ width: '5.5rem' }} />
          <div style={{ marginTop: '1.2rem' }}>
            上传/购买 NFT
          </div>
        </div>
      </Upload>
    </AssetUploadContainer>
  )
}

const SCSelectedNFTColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21.2rem;

  .item {
    width: 21.2rem;
    height: 15rem;
    background-color: #00FFFF;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 19.2rem;
      height: 13rem;
      object-fit: cover;
      cursor: pointer;
    }

    .add {
      width: 5.5rem;
      height: 5.5rem;
    }

    margin-bottom: 0.3rem;
  }

  span {
    color: #cccccc;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`

const SelectedNft: React.FC<{ style: string, content: string }> = ({ style, content }) => {
  return (
    <SCSelectedNFTColumn>
      <div className="item">
        {
          style ? (
            <AntdImage
              src={style}
              preview={false}
            />
          ) : (
            <a href="#style-gene">
              <img src={require('../../assets/images/AIGeneratorsImg/add.png').default} alt="" className="add" />
            </a>
          )
        }
      </div>
      <span>Selected Style NFT</span>
      <div className="item">
        {
          content ? (
            <AntdImage
              src={content}
              preview={false}
            />
          ) : (
            <a href="#my-nft">
              <img src={require('../../assets/images/AIGeneratorsImg/add.png').default} alt="" className="add" />
            </a>
          )
        }
      </div>
      <span>Selected Content NFT</span>
    </SCSelectedNFTColumn>
  )
}

const SelectableNFTItem: React.FC<{ src: string, checked?: boolean, onSelect: (_: string) => void }> = ({
  src,
  checked,
  onSelect
}) => {
  const SelectBtn: React.FC = () => {
    return (
      <div
        style={{
          position: 'absolute',
          width: '23',
          height: ' 23',
          top: '1rem',
          left: '16rem',
          zIndex: 1,
          opacity: 0.7
        }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        top: '1rem',
        marginRight: '1.5rem'
      }}
      onClick={() => onSelect(src)}
    >
      <AntdImage
        width={192}
        height={130}
        src={src}
        style={{ objectFit: 'cover', cursor: 'pointer' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const SelectableNFTList: React.FC<{ selectedValue: string, onSelect: (_: string) => void, list?: string[] }> = ({
  selectedValue,
  onSelect,
  list
}) => {
  return (
    <div className="gene-detail">
      {list?.map(item => (
        <SelectableNFTItem src={item} checked={selectedValue === item} key={item} onSelect={onSelect} />
      ))}
    </div>
  )
}

const RightArrow: React.FC = () => {
  return (
    <div style={{ height: '18.2rem', display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          borderRight: '1px solid #00FFFF',
          width: '1rem',
          height: '18.2rem',
          borderTop: '1px solid #00FFFF',
          borderBottom: '1px solid #00FFFF'
        }}
      />
      <img
        src={require('../../assets/images/AIGeneratorsImg/arrow-right.png').default}
        alt=""
        style={{ width: '3.2rem', height: '2.6rem' }}
      />
    </div>)
}

const AIGenerators: React.FC = () => {
  const { data: personalNfts } = usePersonalNfts()
  const styleList = [
    'http://upload.art.ifeng.com/2015/1022/1445498172676.png?1.2223467451985925',
    'http://upload.art.ifeng.com/2015/1022/1445498178518.png?3.2791961648035794',
    'http://upload.art.ifeng.com/2015/1022/1445498203824.png?4.13313033641316',
    'http://upload.art.ifeng.com/2015/1022/1445498260727.png?3.621879533166066'
  ]

  const [style, setStyle] = useState('')
  const [content, setContent] = useState('')
  const [newNFT, setNewNFT] = useState('')
  const [generating, setGenerating] = useState(false)

  const generate = async () => {
    setGenerating(true)
    const result = await aiGeneratorFastStyle(style, content)
    setGenerating(false)
    setNewNFT(result.data.data)
  }

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
          <p id="style-gene" style={{ position: 'relative', bottom: '5rem' }} />
          <div className="title">Style Gene</div>
          <div className="split-border" />
        </div>
        <SelectableNFTList selectedValue={style} onSelect={v => setStyle(v)} list={styleList} />
        <div className="plus-icon">
          <img src={Plus} style={{ width: '2.6rem', marginTop: '3.1rem' }} alt="" />
        </div>
        <div className="head">
          <p id="my-nft" style={{ position: 'relative', bottom: '5rem' }} />
          <div className="title">My NFT</div>
          <div className="split-border" />
        </div>
        <div className="nft-detail">
          <SelectableNFTList
            selectedValue={content}
            onSelect={v => setContent(v)}
            list={personalNfts?.map((nft: { image: any }) => nft.image)}
          />
          {/*<AssetUpload />*/}
        </div>
      </GeneratorBody>
      <GeneratorFooter>
        <GenerateButton onClick={generate} disabled={generating}>
          {
            !generating ? 'AI Generate' : 'Generating...'
          }
        </GenerateButton>
        <img src={DownArrow} style={{ width: '2.6rem', height: '3.2rem', marginTop: '0.6rem' }} alt="" />
        <GenerateResultContainer>
          <SelectedNft style={style} content={content} />
          <RightArrow />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5rem' }}>
            <img src={require('../../assets/images/AIGeneratorsImg/deep-learning-model.png').default}
              alt=""
              style={{ height: '18.2rem' }}
            />
            <p style={{ color: '#eeeeee', fontSize: '1.4rem', marginTop: '1.3rem' }}>Deep Learning Model</p>
          </div>
          <img
            src={require('../../assets/images/AIGeneratorsImg/arrow-right.png').default}
            alt=""
            style={{ width: '3.2rem', height: '2.6rem', marginLeft: '0.3rem', marginRight: '0.3rem' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#00FFFF',
              width: '21.2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem'
            }}
            >
              {
                newNFT ? (
                  <a href={newNFT} target="view_window">
                    <img src={newNFT} alt="" />
                  </a>
                ) : (
                  <div style={{ height: '15rem' }} />
                )
              }
            </div>
          </div>
        </GenerateResultContainer>
      </GeneratorFooter>
    </AIGeneratorsContainer>
  )
}

export default AIGenerators
