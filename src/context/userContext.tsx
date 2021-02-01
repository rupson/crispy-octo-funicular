import React from 'react'

interface User {
    userId: string
    setUserId: (userId: string) => void
}


export const UserContext = React.createContext<User>({userId: '', setUserId: () => {}})


const UserContextProvider: React.FC<{}> = ({children}) => {
    const [userId, setUserId] = React.useState('')

    React.useEffect( () => {
        console.log(`user context has changed!!! > `, {userId})
    }, [userId])

    return <UserContext.Provider value={{userId, setUserId}}>{children}</UserContext.Provider>
}

export default UserContextProvider
