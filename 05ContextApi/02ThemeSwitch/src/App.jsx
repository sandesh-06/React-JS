
import { useEffect, useState } from "react";
import Card from "./components/Card";
import ThemeBtn from "./components/ThemeBtn";
import { ThemeProvider } from "./context/themeContext";

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

export default App;
