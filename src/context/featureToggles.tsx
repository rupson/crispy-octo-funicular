import React from 'react'
import axios from 'axios'
import { UserContext } from './userContext'

interface FeatureToggle {
    name: string
    enabled: boolean
}

type FeatureToggleContextType = FeatureToggle[]

export const FeatureToggleContext = React.createContext<FeatureToggleContextType>([])


const fetchToggles: (userId: string) => Promise<FeatureToggleContextType> = async (userId) => {
    return (await axios.get(`/feature-toggles?userId=${userId}`)).data
}

const FeatureToggleProvider: React.FC<{}> = ({children}) => {
    const [shouldFetchToggles, setShouldFetchToggles] = React.useState(false)
    const [toggles, setToggles] = React.useState<FeatureToggleContextType>([])

    const {userId} = React.useContext(UserContext)

    React.useEffect( () => {
        const pollToggleInterval = setInterval( () => {
            setShouldFetchToggles(shouldFetchToggles => !shouldFetchToggles)
        }, 1000)
        return () => clearInterval(pollToggleInterval)
    }, [])

    React.useEffect( () => {
        fetchToggles(userId).then(setToggles)

    }, [shouldFetchToggles])

    return <FeatureToggleContext.Provider value={toggles}>{children}</FeatureToggleContext.Provider>
}

export default FeatureToggleProvider
