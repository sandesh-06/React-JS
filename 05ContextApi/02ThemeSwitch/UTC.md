# Understand The Code

We already know how `ContextAPI` works, but let's see how we can configure the same in a different style. (i.e) we have used two file `UserContext` and `UserContextProvider` to configure context in the previous project. In this project let's see a different approach.

The project is to toggle the theme of tailwind using contextAPI.

**themeContext.js**:
```javascript
import { useContext } from "react";
import { createContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    changeTheme: ()=>{}
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext);
}
```

- Here we have created a context `ThemeContext` using the `createContext` method.
- The values inside the `createContext` method is the default values for the context. Yes, we can give default values.
- Then we have created a `ThemeProvider` which we'll be using in the 'App.jsx' file to wrap the components. 
- Notice the `useTheme` function, that is a custom hook to use the context directly, instead of importing `useContext` and `ThemeContext` we can directly import `useTheme` and use it. (optimization bro).

### Wrapping components using provider:
```javascript
function App() {
  const [themeMode, setThemeMode] = useState("light")

  //in the context we have just defined the function, to provide functionality to the function, create the function with the same name and the functionality is assigned automatically by react.
  const changeTheme = ()=>{
    if(themeMode == "light") setThemeMode("dark")
    else setThemeMode("light")
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light", "dark")
    //remove any existing class 

    //add the required class
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode, changeTheme}}>
      <div className="flex flex-wrap h-screen items-center bg-slate-500">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

```

- We have declared the datas/function needed for the context and provided it within the `Provider` directly.
- The components under this provider can now access the variables and function present in the context.

Okay but what about the custom hook? Not a big deal

How do you generally use the context? Like this:
```javascript
import {useContext} from "react"
import ThemeContext from "<path>"

const {themeMode, changeTheme} = useContext(ThemeContext)
```
This is fine for 1 file, but image you have to do the same for every file. So we have created a hook to make the process a little easier.

**The Hook**:
```javascript
export default function useTheme(){
    return useContext(ThemeContext);
}
```
**The Useage**:
```javascript
import useTheme from "../context/themeContext";

export default function ThemeBtn() {
  const { themeMode, changeTheme } = useTheme();
  .
  .
  . 
```