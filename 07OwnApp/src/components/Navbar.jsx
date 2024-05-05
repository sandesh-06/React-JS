import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen p-5 bg-slate-600 flex justify-center'>
        <ul className='hidden sm:flex space-x-10 cursor-pointer font-semibold text-xl'>
            <li className='hover:text-white'>All Todos</li>
            <li className='hover:text-white'>Add Todos</li>
            <li className='hover:text-white'>Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar