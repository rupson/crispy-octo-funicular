import React from 'react'
import { FeatureToggleContext } from "../context/featureToggles"

interface FlagProps {
    flagName: string,
    fallbackComponent?: React.ReactNode
}


const FeatureFlag: React.FC<FlagProps> = ({flagName, fallbackComponent, children}) => {
    const toggles = React.useContext(FeatureToggleContext)
    const shouldRender = toggles.find( (t) => t.name === flagName)?.enabled

    return <>{shouldRender ? children : fallbackComponent}</>
}

export default FeatureFlag