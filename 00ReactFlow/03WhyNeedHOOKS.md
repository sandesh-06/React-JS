# Why do we need Hooks in react?

Let's go through an example to understand the importance of hooks.  
  
With our knowledge of react until now, let's write a code to increment and decrement value with a click of a button.
```javascript
Counter.jsx


function Counter() {
  let counter = 0
  const incVal = () =>{
    console.log("Counter", counter)
    counter += 1
  }
  const decVal = () =>{
    console.log("Counter", counter)
    counter -= 1
  }
  return (
    <>
     <h1>Counter: {counter}</h1>
     <button onClick={incVal}>Inc Value {counter}</button>
     <button onClick={devVal}>Dec Value {counter}</button>
     <p>Final counter: {counter}</p>
    </>
  )
}
export default App

```
When this code gets executed, when you inc or dec the value, the counter gets inc/dec in the console but not in the UI. 

That's where we get to see the power of React and react masters in UI updation.
Imagine if we had to update all the {counter} using classic javascript. We have to use getElementById etc. to select each of them and update one by one.
  
To save you from the mess, here's React to rescue. Using react we can update all of them simultaneously with ease with the help of **REACT HOOKS**.
  
Now let's try to achieve the same using a react hook `useState`.

```javascript
Counter.jsx

import {useState} from 'react'

function Counter() {
  const [counter, setCounter] = useState(0)
       //variable, function(to update the variable)

  const incVal = () =>{
    console.log("Counter", counter)
    setCounter(counter + 1)
  }
  const decVal = () =>{
    console.log("Counter", counter)
    setCounter(counter - 1)
  }
  return (
    <>
     <h1>Counter: {counter}</h1>
     <button onClick={incVal}>Inc Value {counter}</button>
     <button onClick={devVal}>Dec Value {counter}</button>
     <p>Final counter: {counter}</p>
    </>
  )
}
export default Counter

```
Now using this `useState` hook we can update all the {counter} in the UI with just one click.

## To Understand Virtual DOM, Reconciliation, Fibre.
Check this article to know more: [Article](https://github.com/acdlite/react-fiber-architecture)