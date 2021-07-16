import React, {useCallback, useEffect, useState} from 'react'
import styled from "styled-components";
import myDashboard1 from "../../../assets/images/mockImg/myDashboard1.png";
import {useLocationQuery} from "../../../utils";
import {NftDetailFavorite} from "../../../utils/banksyNftList";
import {CopyOutlined} from "@ant-design/icons";
import Show from "*.png";
import Favorite from "*.png";

const LiquidationDetailMain = styled.div`
  min-height: 100vh;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const LeftArea = styled.div`
  width: 35.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31.2rem;
  height: 34.4rem;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  border: 1px solid #98BDF9;

  img {
    max-height: 34.4rem;
    border-radius: 2rem;
  }
`

const RightArea = styled.div`
  width: 53.9rem;
  margin-left: 1.3rem;
  position: relative;
`

const NFTBaseInfoContainer = styled.div`
  .nft-name {
    font-size: 4.5rem;
    font-weight: 550;
    color: #98BDF9;
  }

  .description {
    margin-top: 1.2rem;
    height: 12.5rem;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .info-row {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #98BDF9;
        cursor: pointer;
      }


    }
  }

  .info-row-favorite {
    display: flex;
    justify-content: flex-end;
    margin-top: 6rem;

    .info-row-item-value {
      display: flex;
      justify-content: flex-end;
    }

    .icon-favorite {
      width: 2rem;
      height: 1.2rem;
      display: flex;
      align-self: center;
      margin-right: 0.4rem;
    }


  }

  .price-favorite-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
      display: flex;
      color: #98BDF9;
      font-weight: 550;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #98BDF9;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 1.6rem;
      }
    }

    .info-name {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
    }

  }
`


const NFTBaseInfo: React.FC = () => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const fetchLikeCount = useCallback(async () => {
    NftDetailFavorite(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        Scottlin
      </div>
      <div className="info-row">
        <div className="info-row-item">
          <div className="info-row-item-label">Artist</div>
          <div className="info-row-item-value">
            0x211....3123
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
        <div className="info-row-item">
          <div className="info-row-item-label">Owner</div>
          <div className="info-row-item-value">
            0x211....3123
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
      </div>
      <div className="info-row-favorite">
        <img
          src={Show}
          alt=""
          className="icon-favorite"
        />
        <div className="info-row-item-value" >0</div>
      </div>
    </NFTBaseInfoContainer>)
}

const LiquidationDetailPage:React.FC = () => {
  return (
    <LiquidationDetailMain>
      <Row>
        <LeftArea>
          <ImageContainer>
            <img src={myDashboard1} alt="" />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo />
        </RightArea>
      </Row>
    </LiquidationDetailMain>
  )
}

export default LiquidationDetailPage
