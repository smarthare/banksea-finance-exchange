import React, { useEffect } from 'react'
import styled from 'styled-components'

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 100vw);
  font-size: 10vw;
  font-weight: 500;
  background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width : 300px) and (max-width: 600px) {
    width: fit-content;
    background-color: #0B111E;
    height: 100vh;
  }
`


const PleaseWaiting: React.FC = () => {

  return (
    <Background>
      Please Wait !
    </Background>
  )
}

export default PleaseWaiting
