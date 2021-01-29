import React from 'react'
import axios from 'axios'

interface FeatureToggle {
    name: string
    enabled: boolean
}

type FeatureToggleContextType = FeatureToggle[]

export const FeatureToggleContext = React.createContext<FeatureToggleContextType>([])


const fetchToggles: () => Promise<FeatureToggleContextType> = async () => {
    return (await axios.get('/feature-toggles')).data
}

const FeatureToggleProvider: React.FC<{}> = ({children}) => {
    const [shouldFetchToggles, setShouldFetchToggles] = React.useState(false)
    const [toggles, setToggles] = React.useState<FeatureToggleContextType>([])

    React.useEffect( () => {
        const pollToggleInterval = setInterval( () => {
            console.log(`context::interval>> POLLING!!`)
            setShouldFetchToggles(shouldFetchToggles => !shouldFetchToggles)
        }, 1000)
        return () => clearInterval(pollToggleInterval)
    }, [])

    React.useEffect( () => {
        console.log(`toggles have changed: `, toggles)
    }, [toggles])

    React.useEffect( () => {
        fetchToggles().then(setToggles)

    }, [shouldFetchToggles])

    return <FeatureToggleContext.Provider value={toggles}>{children}</FeatureToggleContext.Provider>
}

export default FeatureToggleProvider
