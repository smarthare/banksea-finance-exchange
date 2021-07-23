import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  width: 100%;
  font-size: 10vw;
  font-weight: 500;
  background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width : 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: 50vh;
    background-color: #0B111E;
    padding: 0;
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
