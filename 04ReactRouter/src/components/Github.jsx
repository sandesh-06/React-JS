import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Github = () => {
    // const [data, setData] = useState({})
    // useEffect(()=>{
    //     fetch("https://api.github.com/users/sandesh-06")
    //     .then((res)=>res.json())
    //     .then((res)=>setData(res))
    //     // console.log(data)
    // })
    // console.log(data)

    const data = useLoaderData()
  return (
    <div className='bg-slate-700 flex justify-evenly'>
        <div>
            <p className='text-white text-2xl p-6'>Github Name: {data["name"]}</p>
            <p className='text-white text-2xl p-6'>Username: {data["login"]}</p>
            <p className='text-white text-2xl p-6'>Followers: {data["followers"]}</p>
            <p className='text-white text-2xl p-6'>Repositories: {data["public_repos"]}</p>
        </div>
        <div>
            <img src={data["avatar_url"]} alt="" />
        </div>
    </div>
  )
}

export default Github

export const githubInfoFetcher = async()=>{
    const res = await fetch("https://api.github.com/users/sandesh-06")

    return res.json()
}