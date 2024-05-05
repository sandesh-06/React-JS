# Understand The Code

What is `ContextAPI`? Why do we even need it?  
Consider the scenario where you have a lot of nested components. Now you need to pass data from the Main component to the component which is nested 4 layers. 

Now you have to pass the data from one component to another until it reaches the destination component. This is exactly how the work was done during early stage of react. But then this is not optimized at all also it creates a lot of confusion.

So if there was a way that the data is stored in a separate place and the component which needs the data can directly access from there, life will be much easier. That is what `ContextAPI` does.

`ContextAPI` is method to provide state management. It is available in the core react library itself.

## Steps to create Context:

1. Create a `Context` using `React.createContext` in a .js file
**UserContext.js**:
```javascript
import React from "react";

UserContext = React.createContext();

export default UserContext;
```
Now we have a `Context` ready. But we also need a `Provider` for the context which provides the data to the components. So how it works is that, there's a context which has a provider and then components which are **wrapped** under the provider only can access the data.

2. Create a `Provider` for the `Context` in a .jsx file
**UserContextProvider.jsx**:
```javascript
import React from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [userDetails, setUserDetails] = React.useState({});
  return (
    // this context now provides userDetails and setUserDetails to all those components that are wrapped under this.
    <UserContext.Provider value={{userDetails, setUserDetails}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
```
UserContextProvider is now a function that accepts a component as `children` and renders the component under `Provider`. The `Provider` has the datas set as `value` which can now be accessed by the children components.


3. Now wrap the components using `Provider`
```javascript

import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UserContextProvider from './context/userContext/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      [<Route path="/" element={<Login/>}/>,
      <Route path="/profile" element={<Profile/>}/>]
    )
  )
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={myRouter}/>
      </UserContextProvider>
    </div>
  )
}

export default App
```

Now the components under `UserContextProvider` will be able to access the datas available in the context.

## How to use ContextAPI

Okay now I know how ContextAPI works, but how do I store or access the datas from the context?

Let's see this using an example.

**Login.jsx**:
```javascript
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Using the data/function from the context
  const {setUserDetails} = useContext(UserContext);
  
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    setUserDetails({username, password})
    navigate("/profile")
  }
```
- In this file we are getting the username and password from the user and sending the data to the context.
- With the help of `useContext` hook we can access the created `context`.
- **NOTE: The `Provider` is just a store that decides which components should access data, but all the dealing with the data is done with `Context`.**
- Here we are accessing the `setUserDetails` method from the context and using it to set the user details.
- Now the user details has been set and it is stored in the context.

Now let's see an example to access the data from the context.

**Profile.jsx**:
```javascript
const Profile = () => {
    const {userDetails} = useContext(UserContext);
    // console.log(userDetails)
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-slate-500 p-10 rounded-lg">
        <p className='text-3xl font-serif font-bold'>Your Username: <span className='text-white underline'>{userDetails.username}</span></p>
        <p className='text-3xl font-serif font-bold'>Your Password: <span className='text-white underline'>{userDetails.password}</span></p>
      </div>
    </div>
  )
}
```
- Here we have used the same `useContext` hook to access the `UserContext`. 
- Using the context we are fetching the `userDetails` data that was previously stored.


This is how `ContextAPI` works, but this is not the only way to manage state. We'll be looking at other state management tools as well further. (phew)