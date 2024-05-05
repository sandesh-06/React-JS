import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8); //default value for the length of password is 8

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  //we want to call this function during every updation of the password, so we can use 'useCallback' hook to make it more efficient.
  //the useCallback hook, memorizes the function, so that everytime when the function is called, it can run more faster
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

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() //if the password is copied, it gives a selection effect
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password])

  // passwordGenerator(); - if you call this function directly, it will run infinite times and throws and error, to handle this we use useEffect hook. It is used to call the function during first page load or if anything is changed among the given dependency array then run the function.
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center text-lg">PASSWORD GENERATOR</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            value={password}
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef} //using this reference we can target the text in the input directly
          /> 
          <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              type="range"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>

            <div className="mx-3">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Numbers?</label>
            </div>

            <div className="mx-3">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Characters?</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
