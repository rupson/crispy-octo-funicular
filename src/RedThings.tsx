import React from 'react'
import { FeatureToggleContext } from "./context/featureToggles"

const RedThings: React.FC<{}> = () => {
    const toggles = React.useContext(FeatureToggleContext)
    console.log(`app::got context: `, toggles)
    React.useEffect( () => {console.log(`app::context has updated> `, toggles)}, [toggles])
    return (
        <>
            {toggles.find((t) => t.name === 'red-things')?.enabled 
                ? <h1 style={{backgroundColor: 'red'}}>a red thing</h1> 
                : <h1 style={{backgroundColor: 'blue'}}>a blue thing</h1>}
        </>)
}

export default RedThings