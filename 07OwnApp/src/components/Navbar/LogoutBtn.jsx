import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../slices/authSlice'
import { useDispatch } from 'react-redux'


const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () =>{
        //since 'logout' is a returns a promise, we need to update the state once logout is done, so use .then
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >
        Logout
    </button>
  )
}

export default LogoutBtn