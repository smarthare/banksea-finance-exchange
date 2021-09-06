import React, { useEffect, useRef } from 'react'
import { Property } from 'csstype'

// @ts-ignore
import Jazzicon from 'jazzicon'

const MetamaskAvatar: React.FC<{address: string, width?: Property.Width, height?: Property.Height}> = ({
  address,
  width = '26px',
  height = '26px'
}) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(26, parseInt(address.slice(2, 10), 26)))
    }
  }, [address])

  return <div ref={ref as any} style={{ width, height }} />
}

export default MetamaskAvatar
