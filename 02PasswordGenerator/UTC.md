# UNDERSTANDING THE CODE

```javascript
import { useState, useCallback, useEffect, useRef } from "react";
```

We have already seen about the useState hook.  
In this let's look at the other hooks.  

## useCallback Hook:

```javascript
const passwordGenerator = useCallback(() => {
    let pass = "";

    //we are gonna generate the password from the below string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+><";

    for (let i = 1; i <= length; i++) {
      let charIdx = Math.floor(Math.random() * str.length + 1); //to get a random index from str

      pass += str.charAt(charIdx);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
```

- Here our goal is to generate the password using the `passwordGenerator` method.
- Everytime we change the state of length, numberAllowed, charAllowed, we want the function to run.  
- When we call the function explicitly when there's a change in state, a new instance of the function is created everytime (i.e), the function is treated a new function everytime we call it.
- This degrades the performance.
- Using the `useCallback` hook we can store the function in cache and whenever the state of dependencies provided get's changed the function calls itself.

## useEffect Hook:
- We wan't the password generator function to run when the page get's ready or it reloads. So can we just call the function like this?
```javascript
passwordGenerator()
```
- This would result in an infinite function calling loop. Because we never specified react when to call the function.
- To overcome this we can use `useEffect` hook.
```javascript
 useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword, passwordGenerator])
```
- `useEffect` hook calls the function when a page is rendered or when there's a change in the provided dependency.

## useRef Hook:
- `useRef` hook is used to provide reference.
Let's understand using this example:
```html
<div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input
    value={password}
    type="text"
    className="outline-none w-full py-1 px-3"
    placeholder="password"
    readOnly
    /> 
    <button
    onClick={copyPasswordToClipboard}
    className="outline-none bg-blue-600 text-whipx-3 py-0.5 shrink-0">
    Copy
    </button>
</div>
```

- When we click the copy button, it fires the `copyPasswordToClipboard` function and the password get's copied to the clipboard as well.
- Ok so what's the problem? Well when the password get's copied I need to show the user that the password has been copied by selecting the text inside the input.
- Now how do I link the `copyPasswordToClipboard` function with the input? That's where we use the useRef hook.
- We take the referece of the input using `useRef` and now the reference is linked to the input. So we can perform operations on the referece that reflects on the input.
