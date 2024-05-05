import {useState} from 'react'

function App() {
  const [counter, setCounter] = useState(0)
       //variable, function(to update the variable)

  const incVal = () =>{
    if(counter < 10) setCounter(counter + 1)
  }
  const decVal = () =>{
    if(counter > 0 ) setCounter(counter - 1)
  }
  return (
    <>
     <h1>Counter: {counter}</h1>
     <button onClick={incVal}>Inc Value {counter}</button>
     <button onClick={decVal}>Dec Value {counter}</button>
     <p>Final counter: {counter}</p>
    </>
  )
}
export default App