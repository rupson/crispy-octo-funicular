import React from 'react'
import FeatureFlag from './FeatureFlag'

const GreenCircle: React.FC<{}> = () => {
  return (
  <FeatureFlag flagName={'green-circle'}>
    <div style={{backgroundColor: 'green', borderRadius: '50%', width: '150px', height: '150px'}} />
  </FeatureFlag>)
}

export default GreenCircle