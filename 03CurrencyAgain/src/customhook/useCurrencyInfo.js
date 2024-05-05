import { useEffect, useState } from "react";


const useCurrencyInfo = (currency) =>{

    const [currencyList, setCurrencyList] = useState({}) //1. Create a state for list of currencies.

    useEffect(()=>{ //2. use useEffect hook to get the currency data when currency get's updated.

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res)=>res.json())
        .then((res)=>setCurrencyList(res[currency]))

    }, [currency])

    // console.log(currencyList)
    return currencyList
    
}

export default useCurrencyInfo
