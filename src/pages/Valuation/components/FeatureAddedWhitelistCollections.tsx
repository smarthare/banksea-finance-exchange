import styled from 'styled-components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { WhitelistCollection } from 'hooks/queries/insight/overview/useWhitelistCollectionsQuery'
import { numberWithCommas } from '../../../utils'

type FeatureAddedWhitelistCollectionsProps = {
  collections: any[]
}

// export type FeatureAddedWhitelistCollection = {
//   coverUrl: string
//   avatarUrl: string
//   name: string
//   added: string
//   owner: number
//   volume: number
//   description: string
// }

const ListContainer = styled.div`
  margin: 88px auto 0 auto;

  @media screen and (min-width: 1601px) and (max-width: 1800px) {
    margin-left: -5%;
    margin-right: -5%;
  }

  @media screen and (min-width: 1501px) and (max-width: 1600px) {
    margin-left: -10%;
    margin-right: -10%;
  }


  @media screen and (min-width: 1001px) and (max-width: 1500px) {
    width: 650px;
  }

  @media screen and (max-width: 1000px) {
    width: 300px;
  }

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 45px;
  }

  .items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

`

const ItemContainer = styled.div`
  width: 300px;
  height: 422px;
  border-radius: 10px;
  background-color: #101C3A;
  margin-bottom: 20px;
  cursor: pointer;

  img.cover {
    height: 206px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .main-area {
    position: relative;
    padding: 8px 15px;

    .column {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 8px;

      .name {
        font-size: 18px;
        font-weight: 500;
      }

      .info {
        color: rgb(122, 129, 146);
      }

      .description {
        margin-top: 10px;
        font-size: 14px;
        color: #ddd;
        width: 100%;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }

    }

    img.logo {
      width: 42px;
      height: 42px;
      border-radius: 21px;
      margin-right: 7px;
      margin-top: 4px;
      position: absolute;
      right: 8px;
      top: 8px;
    }

  }
`

const SingleCollection: React.FC<{ collection: WhitelistCollection }> = ({ collection }) => {
  const history = useHistory()

  const { seriesPoster, seriesLogo, seriesDescription, seriesName, numOwners, totalVolume, seriesSlug } = collection

  return (
    <ItemContainer onClick={() => history.push(`/insight/${seriesSlug}`)}>
      <img src={seriesPoster} alt={seriesName} className="cover" />

      <div className="main-area">
        <div className="column">
          <div className="name">{seriesName}</div>
          <div className="info">Owner(s): {numberWithCommas(numOwners, 0)}</div>
          <div className="info">Total Volume: Ξ{numberWithCommas(totalVolume)}</div>
          <div className="description">{seriesDescription}</div>
        </div>

        <img src={seriesLogo} alt={seriesName} className="logo" />

      </div>
    </ItemContainer>
  )
}

const FeatureAddedWhitelistCollections: React.FC<FeatureAddedWhitelistCollectionsProps> = ({ collections }) => {
  return (
    <ListContainer>
      <div className="title">Whitelist Collections Added Featured</div>
      <div className="items">
        {
          collections.map(collection => (
            <SingleCollection
              collection={collection}
              key={collection.id}
            />
          ))
        }
      </div>
    </ListContainer>
  )
}

export default FeatureAddedWhitelistCollections
