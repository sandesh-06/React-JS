# Understand The Code

In this project we are going to create a currency converter. We'll be using our own custom hook to achieve this.  

1. **The Custom Hook**:  
Let's create a custom hook which takes a currency as input and returns the conversion rates.
```javascript
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

```
Now whenever we need the conversion rates for a currency we can just call this hook.
