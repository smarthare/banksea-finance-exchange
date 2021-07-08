import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Image as AntdImage, Image, Divider } from 'antd'
import Plus from '@/assets/images/AIGeneratorsImg/plus.png'
import DownArrow from '@/assets/images/AIGeneratorsImg/arrow-down.png'
import download from '@/assets/images/AIGeneratorsImg/download.png'
import { usePersonalNfts } from '../../hooks/usePersonalNfts'
import { aiGeneratorFastStyle } from '../../apis/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { aiStyleList, aiSwiperList } from '../../utils/banksyNftList'

SwiperCore.use([Navigation, EffectCoverflow, Pagination])

const AIGeneratorsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99.4rem;
  font-family: 'PingFang SC';
  padding: 5rem 11.2rem;
`

const MainCarousel = styled.div`
  position: relative;
  margin-left: calc((100% - 82.2rem) / 2);

  .top-area {
    width: 82.8rem;
    height: 23.2rem;
    background: url(${require('../../assets/images/AIGeneratorsImg/generatorsBG.png').default});
    background-size: contain;
  }

  .bottom-area {
    width: 82.8rem;
    height: 12rem;

  }

  .swiperTop {
    width: 100%;
    position: absolute;
    top: 18rem;
    z-index: 10;
    color: #fff;

    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 17rem;
      height: 17rem;

      img {
        object-fit: cover
      }
    }
  }

`

const GeneratorTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  width: 500rem;
  background-color: #0B111E;
  border: solid 0.3rem #4D4D4D;

  .introduce {
    text-align: center;
    color: #97BCF9;

    .title {
      font-weight: 550;
      font-size: 4.6rem;

      background-image: -webkit-linear-gradient(left, #7fe6ec, #4b0fe5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 2rem;
    }
  }

`

const MyAntdImage = styled(AntdImage)`

`

const GeneratorBody = styled.div`
  padding: 1.8rem 0;
  width: 89.8rem;



  .head {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .hr-line-gene{
      margin:0 auto;
      height: 0.7rem;
      width: 100%;
      background: radial-gradient(#5349F9 14%, #0B111E 80%);
    }

    .hr-line-nft {
      margin:0 auto;
      height: 0.7rem;
      width: 100%;
      background: radial-gradient(#B2B2B2 14%, #0B111E 80%);
    }

    .title {
      text-align: center;
      font-size: 2.4rem;
      padding: 1.2rem 0;
      font-weight: 550;
      color: #5349F9;
      line-height: 2.5rem;
    }

  }


  .plus-icon {
    display: flex;
    justify-content: center;
  }
`

const GeneratorFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`

const Description = styled.div`
  width: 99.4rem;
  padding: 2.6rem 5.7rem;
  margin-top: 2.5rem;
  text-align: center;
  border: 2px dashed #7C6DEB;
  background: #E5E2FB;
  color: #7C6DEB;
`

/*const GenerateButton = styled.div`
  width: 405px;
  height: 50px;
  background: #7C6DEB;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 50px;
  text-align: center;
`*/

const CreatButton = styled(Button)`
  width: 211px;
  height: 50px;
  background: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #7C6DEB;
  line-height: 22px;
  position: absolute;
  bottom: 3.7rem;
  left: calc((100% - 211px) / 2);

  :hover {
    background: #00FFFF;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
  }
`

/*const AssetUploadContainer = styled.div`
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
`*/

const GenerateResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  width: 99.4rem;
  height: 53.1rem;
  border-radius: 1rem;
  padding: 3.5rem 5.9rem;
  position: relative;
`

const NewNftperating = styled.div`
  position: absolute;
  bottom: 0.9rem;
  right: 1rem;
  display: flex;
  align-items: center;
  z-index: 10;

  .download {
    width: 2.2rem;
  }
`


/*const NFTItem: React.FC<{ src: string }> = ({ src }) => {
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
}*/

/*const AssetUpload: React.FC = () => {
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
}*/

const SCSelectedNFTColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21.2rem;

  .item {
    width: 20rem;
    height: 21rem;
    background-color: #111C3A;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;

    img {
      width: 20rem;
      height: 21rem;
      object-fit: cover;
      cursor: pointer;
      border-radius: 1rem;

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

const SwiperTop: React.FC<{ list?: string[] }> = ({ list }) => {
  return (
    <div className="swiperTop">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          'rotate': 50,
          'stretch': 0,
          'depth': 100,
          'modifier': 1,
          'slideShadows': true,
        }}
        pagination={true}
      >
        {list?.map((item, key) => (
          <SwiperSlide key={key}>
            <img style={{ height: '100%', objectFit: 'cover', minWidth: '100%' }} src={item} key={item}  alt="" />
          </SwiperSlide>
        ))}
        <SwiperSlide />
      </Swiper>
    </div>
  )
}

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
            <a href="#/ai-generators#style-gene">
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
            <a href="#/ai-generators#my-nft">
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
          left: '11rem',
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
        top: '1rem'
      }}
      onClick={() => onSelect(src)}
    >
      <MyAntdImage
        width={200}
        height={210}
        src={src}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '1rem', margin:'0' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const DeepLearningBG: React.FC<any> = () => {
  return (
    <div />
  )
}


const SelectableNFTList: React.FC<{ selectedValue: string, onSelect: (_: string) => void, list?: string[] }> = ({
  selectedValue,
  onSelect,
  list
}) => {
  return (
    <div className="gene-detail">
      <Swiper slidesPerView={4}
        spaceBetween={50}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
      >
        {list?.map((item, key) => (
          <SwiperSlide key={key}>
            <SelectableNFTItem src={item} checked={selectedValue === item} key={item} onSelect={onSelect} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const RightArrow: React.FC = () => {
  return (
    <div style={{ height: '18.2rem', display: 'flex', alignItems: 'center' }}>

      <img
        src={require('../../assets/images/AIGeneratorsImg/deep-learning-line.png').default}
        alt=""
        style={{
          width: '48.5rem'
        }}
      />

      <div style={{
        position:'absolute'
      }}
      >
        <img src={require('../../assets/images/AIGeneratorsImg/deep-learning-model.png').default}
          alt=""
          style={{
            width: '16rem',
            marginLeft: '22rem'
          }}

        />
      </div>

    </div>
  )
}

const AIGenerators: React.FC = () => {
  const { data: personalNfts } = usePersonalNfts()
  const [styleList, setStyleList] = useState<any>()
  const [swiperList, setSwiperList] = useState<any>()
  const [generating, setGenerating] = useState(false)
  const init = useCallback(async () => {
    aiStyleList().then(res => {
      setStyleList(res.data.data)
    })
    aiSwiperList().then(res => {
      setSwiperList(res.data.data)
    })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const [style, setStyle] = useState('')
  const [content, setContent] = useState('')
  const [newNFT, setNewNFT] = useState('')

  const generate = async () => {
    setGenerating(true)
    const result = await aiGeneratorFastStyle(style, content)
    setGenerating(false)
    setNewNFT(result.data.data)
  }

  return (
    <AIGeneratorsContainer>
      <GeneratorTop>
        <div className="introduce" >
          <p className="title">Level Up</p>
          <p>Al Generation uses artificial intelligence algorithms</p>
          <p>to extract the image style of Style Gene NFT and integrate it with the image of My</p>
          <p>NFT to reconstruct a brand-new NFT, which is a very interesting gameplay.</p>
        </div>


        {/*<MainCarousel>
          <div className="top-area" />
          <div className="bottom-area" />
          <SwiperTop list={swiperList?.map((style: { url: any }) => style?.url)} />
        </MainCarousel>*/}
      </GeneratorTop>
      <GeneratorBody>
        <div className="head">
          <div className="hr-line-gene" />
          <p id="/ai-generators#style-gene" style={{ position: 'relative', bottom: '5rem' }} />
          <div className="title">Style Gene</div>

          <SelectableNFTList selectedValue={style}
            onSelect={v => setStyle(v)}
            list={styleList?.map((style: { url: any }) => style?.url)}
          />
          <div className="hr-line-gene" style={{ marginTop: '3.4rem' }} />
        </div>
        <div className="head" style={{ marginTop: '5rem' }}>
          <div className="hr-line-nft" />
          <p id="/ai-generators#my-nft" style={{ position: 'relative', bottom: '5rem' }} />
          <div className="title">My NFT</div>
          <div className="split-border" />

          <SelectableNFTList
            selectedValue={content}
            onSelect={v => setContent(v)}
            list={personalNfts?.map((nft: { image: any }) => nft.image)}
          />

          <div className="hr-line-nft" style={{ marginTop: '3.4rem' }} />
        </div>
        {/*<AssetUpload />*/}
      </GeneratorBody>
      <GeneratorFooter>
        <GenerateResultContainer>
          <SelectedNft style={style} content={content} />
          <RightArrow />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#111C3A',
              width: '21.2rem',
              height: '25rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              position: 'relative',
              borderRadius:'1rem'
            }}
            >
              {
                newNFT ? (
                  <Image src={newNFT} alt="" />
                ) : (
                  <div style={{ height: '15rem' }} />
                )
              }
              <NewNftperating>
                {
                  newNFT ? (
                    <a href={newNFT} target="view_window">
                      <img className="download" src={download}  alt="" />
                    </a>
                  ) : (
                    <img className="download" src={download}  alt="" />
                  )
                }
              </NewNftperating>
            </div>
          </div>
          <CreatButton onClick={generate} disabled={generating}>
            {
              !generating ? 'AI Generate' : 'Generating...'
            }
          </CreatButton>
        </GenerateResultContainer>

      </GeneratorFooter>
    </AIGeneratorsContainer>
  )
}

export default AIGenerators
