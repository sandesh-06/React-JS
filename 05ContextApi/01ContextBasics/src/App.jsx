
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
