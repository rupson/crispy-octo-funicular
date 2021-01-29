import React from 'react'
import { FeatureToggleContext } from "./context/featureToggles"

const MyComponent: React.FC<{}> = () => {
    const toggles = React.useContext(FeatureToggleContext)
    console.log(`app::got context: `, toggles)
    React.useEffect( () => {console.log(`app::context has updated> `, toggles)}, [toggles])
    return (
        <>
            {/* <h1 style={{backgroundColor: 'blue'}}>a blue thing</h1> */}
            {toggles.find((t) => t.name === 'red-things')?.enabled && <h1 style={{backgroundColor: 'red'}}>RED THINGS</h1>}
        </>)
}

export default MyComponent