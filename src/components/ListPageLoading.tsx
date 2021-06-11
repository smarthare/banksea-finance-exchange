import React, { useEffect } from 'react'
import lottie from 'lottie-web'

type ListPageLoadingProps = {
  loading: boolean
}

const ListPageLoading: React.FC<ListPageLoadingProps> = ({ loading }) => {
  useEffect(() => {
    const { name } = lottie.loadAnimation({
      container: document.getElementById('lottie-animation')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets3.lottiefiles.com/packages/lf20_NddMyN.json'
    })

    return () => {
      lottie.destroy(name)
    }
  }, [])

  return (
    <div id="lottie-animation" style={{ width: '150px', height: '150px', display: loading ? '' : 'none' }} />
  )
}

export default ListPageLoading
