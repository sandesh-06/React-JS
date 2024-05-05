import { useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./customHooks/useCurrencyInfo";

function App() {
  //define all the states
  //1. We need to get and set amount
  const [amount, setAmount] = useState(0);

  //2. To get and select currency type (from and to)
  const [fromCurr, setFromCurr] = useState("usd")
  const [toCurr, setToCurr] = useState("inr")

  //3. To store the information of converted amount
  const [convertedAmount, setConvertedAmount] = useState(0)

  //4. Get the currency info from the api. The currency types are stored as keys, so only get the keys
  const apiCurr = useCurrencyInfo(fromCurr) 
  // console.log("apicurr", apiCurr)
  const currOptions = Object.keys(apiCurr)
  // console.log(currOptions)

  //FUNCTION TO CONVERT THE AMOUNT
  const handleAmountConvertion = (e)=>{
    e.preventDefault();
    const finalAmt = (apiCurr[toCurr] * amount).toFixed(2); //only dislay upto 2 decimal points
    setConvertedAmount(finalAmt);
  }

  //FUNCTION TO SWAP THE CONVERSION
  const swapConversion = (e) =>{
    setFromCurr(toCurr)
    setToCurr(fromCurr)
  }
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form>
            <div className="w-full mb-1">
              {/* pass all the info as props to the Input box */}
              <InputBox label="From"
              amount={amount}
              onAmountChange={(amount)=>setAmount(amount)} //the 'amount' is received from the function onAmountChange from the child component
              currencyOptions={currOptions}
              onCurrencyChange={(currency)=>setFromCurr(currency)}
              currentCurrency={fromCurr}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapConversion}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox label="To" 
                amount={convertedAmount}
                currencyOptions={currOptions}
                onCurrencyChange={(currency)=>setToCurr(currency)}
                currentCurrency={toCurr}
                inputDisable //will set inputDisable to true
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              onClick={handleAmountConvertion}
            >Convert {fromCurr} to {toCurr}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
