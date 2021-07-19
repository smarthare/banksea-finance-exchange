import React, { useEffect } from 'react'
import lottie from 'lottie-web'

const PageLoading: React.FC = () => {
  useEffect(() => {
    const { name } = lottie.loadAnimation({
      container: document.getElementById('lottie-animation')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets9.lottiefiles.com/packages/lf20_kk62um5v.json'
    })

    return () => {
      lottie.destroy(name)
    }
  }, [])

  return (
    <div
      id="lottie-animation"
      style={{
        width: '20rem',
        height: '20rem',
        margin: 'auto',
        marginTop: 'calc((100vh - 26rem) / 2)'
      }}
    />
  )
}

export default PageLoading
