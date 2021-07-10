import React, { useEffect } from 'react'
import styled from 'styled-components'

const Background = styled.div`
  width: 100%;
  min-height: calc(100vh - 6.2rem);
  font-size: 10rem;
  font-weight: 500;
  background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`


const PleaseWaiting: React.FC = () => {

  return (
    <Background>
      Please Wait !
    </Background>
  )
}

export default PleaseWaiting
