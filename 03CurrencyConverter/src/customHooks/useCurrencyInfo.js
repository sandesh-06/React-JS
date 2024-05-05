import { useEffect, useState } from "react"

//with this custom hook, I can get the info for a particular currency
const useCurrencyInfo = (currency)=>{
    const [data, setData] = useState({})
    useEffect(()=>{
        //using an api to get the currency info

        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res)=>res.json()) //most api calls gives response as a string, so converting it to json
        .then((res)=>setData(res[currency])) //the api has a response like {"inr": ....}, so getting it using res[inr]
    }, [currency])
    return data
}

export default useCurrencyInfo; //exporting our custom hook, we can get the data for any currency
