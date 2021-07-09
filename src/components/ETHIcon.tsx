import React from 'react'

const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../assets/images/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginRight: '0.8rem' }}
    />
  )
}

export default ETHIcon
