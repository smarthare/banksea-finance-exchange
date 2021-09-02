import styled from 'styled-components'
import React from 'react'
import { CollectionInfo } from '../../../types/CollectionValuation'
import { useHistory } from 'react-router-dom'

type FeatureAddedWhitelistCollectionsProps = {
  collections: CollectionInfo[]
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

  @media screen and (min-width: 1000px) and (max-width: 1800px) {
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
  height: 412px;
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
    padding: 8px 15px;

    .base-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;

      .name {
        font-size: 18px;
        font-weight: 500;
      }

      .info {
        color: rgb(122, 129, 146);
      }

      img {
        width: 42px;
        height: 42px;
        border-radius: 21px;
        margin-right: 7px;
        margin-top: 4px;
      }
    }

    .description {
      font-size: 14px;
      color: white;
      color: #ddd;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
`

const SingleCollection: React.FC<{ collection: CollectionInfo }> = ({ collection }) => {
  const history = useHistory()

  const { seriesPoster, seriesLogo, seriesDescription, seriesName, numOwners, totalVolume, added } = collection

  return (
    <ItemContainer onClick={() => history.push(`/valuation/${seriesName}`)}>
      <img src={seriesPoster} alt={seriesName} className="cover" />

      <div className="main-area">
        <div className="base-row">
          <div>
            <div className="name">{seriesName}</div>
            <div className="info">Added: {added}</div>
            <div className="info">Owner(s): {numOwners}</div>
            <div className="info">Total Volume: {totalVolume}</div>
          </div>
          <img src={seriesLogo} alt={seriesName} />
        </div>

        <div className="description">{seriesDescription}</div>
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
