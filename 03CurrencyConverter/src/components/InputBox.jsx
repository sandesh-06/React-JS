import { useId } from "react";

const InputBox = ({
  label, //from / to
  amount,
  inputDisable = false,
  currencyOptions = [],
  onAmountChange, //to get the amount input of user
  onCurrencyChange, //to get the type of currency value (inr / usd) etc
  currentCurrency = "usd",
}) => {
  const amountInputId = useId(); //generates a unique id. We need it to map label to it's input (don't use it as key while mapping)
  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={
            (e) => onAmountChange && onAmountChange(Number(e.target.value)) //incase the value is in string, convert it to number
          } //only if amount change exists, then call the function
          disabled={inputDisable} //for the 2nd input box, we don't want the user to enter any value
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          value={currentCurrency}
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
