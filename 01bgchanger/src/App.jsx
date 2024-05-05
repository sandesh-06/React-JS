
import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("olive")
  console.log(color);
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center' style={{backgroundColor: color}}>
        <div className='bg-red-200 p-4 flex gap-4 rounded-lg'>
          <button onClick={()=>setColor('red')} className='bg-red-600 p-3 rounded shadow-lg text-white font-bold'>Red</button>
          <button onClick={()=>setColor('green')} className='bg-green-600 p-3 rounded shadow-lg text-white font-bold'>Green</button>
          <button onClick={()=>setColor('blue')} className='bg-blue-600 p-3 rounded shadow-lg text-white font-bold'>Blue</button>
          <button onClick={()=>setColor('orange')} className='bg-orange-600 p-3 rounded shadow-lg text-white font-bold'>Orange</button>
          <button onClick={()=>setColor('yellow')} className='bg-yellow-600 p-3 rounded shadow-lg text-white font-bold'>Yellow</button>
          <button onClick={()=>setColor('violet')} className='bg-violet-600 p-3 rounded shadow-lg text-white font-bold'>Violet</button>
          <button onClick={()=>setColor('black')} className='bg-black p-3 rounded shadow-lg text-white font-bold'>Black</button>
          {/* <button onClick={setColor('red')} className='bg-red-600 p-3 rounded shadow-lg text-white font-bold'>Red</button>
          <button onClick={setColor('green')} className='bg-green-600 p-3 rounded shadow-lg text-white font-bold'>Green</button>
          <button onClick={setColor('blue')} className='bg-blue-600 p-3 rounded shadow-lg text-white font-bold'>Blue</button>
          <button onClick={setColor('orange')} className='bg-orange-600 p-3 rounded shadow-lg text-white font-bold'>Orange</button>
          <button onClick={setColor('yellow')} className='bg-yellow-600 p-3 rounded shadow-lg text-white font-bold'>Yellow</button>
          <button onClick={setColor('violet')} className='bg-violet-600 p-3 rounded shadow-lg text-white font-bold'>Violet</button>
          <button onClick={setColor('black')} className='bg-black p-3 rounded shadow-lg text-white font-bold'>Black</button> */}

          {/* THE ONCLICK EVENT EXPECTS A FUNCTION, IF YOU JUST PASS SETCOLOR('COLOR') IT INSTANTLY RUNS WITHOUT CLICKING THE BUTTON*/}
        </div>
      </div>
    </>
  )
}

export default App
