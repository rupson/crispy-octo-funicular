import React from 'react'
import FeatureFlag from './FeatureFlag'


const RedThings: React.FC<{}> = () => {
    return (
        <FeatureFlag flagName={'red-things'} fallbackComponent={<h1 style={{backgroundColor: 'blue'}}>a blue thing</h1>}>
            <h1 style={{backgroundColor: 'red'}}>a red thing</h1>
        </FeatureFlag>)
}

export default RedThings