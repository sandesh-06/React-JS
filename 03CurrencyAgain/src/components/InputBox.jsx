import React, { useId } from "react";

const InputBox = ({
  label, //from, to
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  inputDisabled,
}) => {
  const amountInputId = useId(); //this is for performance optimization, to bind label and input
  return (
    <div className="flex">
      <div className="flex justify-between space-x-4 m-auto border rounded-lg px-6 py-8 items-center bg-slate-400">
        {/* label side */}
        <div className="flex flex-col">
          <label htmlFor={amountInputId}>{label}</label>
          <input
            id={amountInputId}
            className="rounded-sm px-3 py-2"
            type="number"
            value={amount}
            disabled={inputDisabled}
            onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))} // we are taking the value from here and sending it to the function in App.jsx
            placeholder="enter amount here"
          />
        </div>

        {/* currency type side */}
        <div className="flex flex-col">
          <label>Currency Type</label>
          <select
            className="rounded-sm w-20 px-3 py-2"
            name=""
            value={selectCurrency}
            onChange={(e) =>onCurrencyChange && onCurrencyChange(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
