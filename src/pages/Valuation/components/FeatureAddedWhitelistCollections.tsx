import styled from 'styled-components'
import React from 'react'

type FeatureAddedWhitelistCollectionsProps = {
  collections: FeatureAddedWhitelistCollection[]
}

export type FeatureAddedWhitelistCollection = {
  coverUrl: string
  avatarUrl: string
  name: string
  added: string
  owner: number
  volume: number
  description: string
}

const ListContainer = styled.div`
  margin-top: 88px;

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 45px;
  }

  .items {
    display: flex;
    justify-content: space-between;
  }
`

const ItemContainer = styled.div`
  width: 300px;
  height: 412px;
  border-radius: 10px;
  background-color: #101C3A;

  img.cover {
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
      line-height: 27px;
      color: #ddd;
    }
  }
`

const SingleCollection: React.FC<{ collection: FeatureAddedWhitelistCollection }> = ({ collection }) => {
  const { coverUrl, avatarUrl, description, name, owner, volume, added } = collection

  return (
    <ItemContainer>
      <img src={coverUrl} alt={name} className="cover" />

      <div className="main-area">
        <div className="base-row">
          <div>
            <div className="name">{name}</div>
            <div className="info">Added: {added}</div>
            <div className="info">Owner(s): {owner}</div>
            <div className="info">Total Volume: {volume}</div>
          </div>
          <img src={avatarUrl} alt={name} />
        </div>

        <div className="description">{description}</div>
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
              key={collection.name}
            />
          ))
        }
      </div>
    </ListContainer>
  )
}

export default FeatureAddedWhitelistCollections
