import React from 'react'
import UserContext from './UserContext'


const UserContextProvider = ({children}) => {
    const [userDetails, setUserDetails] = React.useState({});
  return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider