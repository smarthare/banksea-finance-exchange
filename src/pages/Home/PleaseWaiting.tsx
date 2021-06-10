import React, { useEffect } from 'react'
import styled from 'styled-components'
import lottie from 'lottie-web'

const Background = styled.div`
  width: 100%;
  height: calc(100vh - 6.5rem);
  background: #7158e2;
  position: relative;
`

const Wait = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
`

const PleaseWaiting: React.FC = () => {

  useEffect(() => {
    lottie.loadAnimation({
      // @ts-ignore
      container: document.getElementById('lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets6.lottiefiles.com/packages/lf20_o2hajsce.json'
    })

    lottie.loadAnimation({
      // @ts-ignore
      container: document.getElementById('waiting'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets7.lottiefiles.com/packages/lf20_YZb2Qu.json'
    })
  })

  return (
    <Background id="lottie-animation">
      <Wait id="waiting" />
    </Background>
  )
}

export default PleaseWaiting
