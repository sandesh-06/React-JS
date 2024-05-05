import { useEffect, useState } from "react";
import useCurrencyInfo from "./customhook/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  //1. Input amount
  const [amount, setAmount] = useState(0);

  //2. converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);

  //3. from currency
  const [fromCurr, setFromCurr] = useState("usd");

  //4. to currency
  const [toCurr, setToCurr] = useState("inr");

  //5. Get the currency info
  const currencyInfo = useCurrencyInfo(fromCurr);

  //6. get the options from currencyInfo
  const currencyOptions = Object.keys(currencyInfo);

  //7. on currency change
  const onToCurrencyChange = (toCurr)=>{
    setToCurr(toCurr)
  }
  const onFromCurrencyChange = (fromCurr)=>{
    setFromCurr(fromCurr)
  }
 

  //10. Convert Amount
  const convertAmount = (e)=>{
    e.preventDefault();
    const amt = (amount * Number(currencyInfo[toCurr])).toFixed(2)
    setConvertedAmount(amt)
    console.log(amt)
  }
  //swap the currency from - to
  const swapCurrState = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  useEffect(() => {
    // console.log(currencyOptions);
  });
  return (
    <>
      <div
        className="h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="flex flex-col gap-3 border p-10 rounded-md backdrop-blur-md items-center">
          <InputBox
            label="From"
            // amount={amount}
            currCurrency={fromCurr}
            inputDisabled={false}
            currencyOptions={currencyOptions}
            selectCurrency={fromCurr}
            onCurrencyChange={onFromCurrencyChange}
            onAmountChange={(amount)=>setAmount(amount)}
          />
          <button
            className="bg-blue-700 py-2 px-5 text-lg rounded-xl text-white"
            onClick={swapCurrState}
          >
            &#8593; swap &#8595;
          </button>
          <InputBox
            label="To"
            currCurrency={toCurr}
            inputDisabled={true}
            currencyOptions={currencyOptions}
            selectCurrency={toCurr}
            onCurrencyChange={onToCurrencyChange}
            amount={convertedAmount}
          />
        </div>
        <button className="bg-blue-700 my-2 py-2 px-5 text-2xl rounded-xl text-white hover:bg-blue-600"
        onClick={convertAmount}
        >
          Convert {fromCurr.toUpperCase()} to {toCurr.toUpperCase()}
        </button>
      </div>
    </>
  );
}

export default App;
