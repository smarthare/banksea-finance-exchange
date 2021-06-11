import React from 'react'
import styled from 'styled-components'

type NFTCreatedSuccessProps = {
  name: string
}

const SCNFTCreatedSuccess = styled.div`
  margin: 15rem auto;
  width: 50rem;
  background-color: white;
  padding: 4.2rem 9.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  margin-bottom: 4rem;
  font-size: 1.8rem;

  b:after {
    content: ' ';
  }
`

const Image = styled.img`
  width: 30.2rem;
`

const NFTCreatedSuccess: React.FC<NFTCreatedSuccessProps> = () => {
  const name = 'DOGE'

  return (
    <SCNFTCreatedSuccess>
      <Title>
        <b>
          {name}
        </b>
        has been created
      </Title>
      <Image src="https://gateway.pinata.cloud/ipfs/QmU7KfiPy9Gs4VuKcWSSpeSPmb4yC6gGyXCo5kSSiot3Pq" alt={name} />

    </SCNFTCreatedSuccess>)
}

export default NFTCreatedSuccess
