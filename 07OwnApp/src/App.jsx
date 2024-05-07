import { useEffect, useState } from 'react'
import './App.css'
import { Navbar, Footer } from './components'
import { useDispatch } from 'react-redux';

import authService from "./appwrite/auth";
import { login, logout } from './slices/authSlice';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    //1. TO CHECK IF THE USER IS LOGGED IN OR NOT
    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        console.log(userData)
        if(userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(setIsLoading(false));
    })

  return (
    <>
      {!isLoading ? (
        // IF LOADING IS FALSE
        <div className='min-h-screen flex flex-wrap bg-slate-600 content-between'>
          <Navbar/>
        </div>
      ):(

        //IF LOADING IS TRUE
        <div className='min-h-screen bg-slate-600 flex justify-center items-center'>
          <p className='text-white text-3xl font-semibold'>Loading....</p>
        </div>
      )}
    </>
  )
}

export default App
