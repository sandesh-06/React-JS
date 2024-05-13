import { useEffect, useState } from "react";
import { Navbar, Footer } from "./components";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logout } from "./slices/authSlice";

import { Outlet } from "react-router-dom";
function App({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  //1. TO CHECK IF THE USER IS LOGGED IN OR NOT
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(setIsLoading(false));
  });

  return (
    <>
      {!isLoading ? (
        // IF LOADING IS FALSE
        <div className="min-h-screen flex flex-wrap bg-slate-600 content-between">
          <div className="w-full block">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </div>
      ) : (
        //IF LOADING IS TRUE
        <div className="min-h-screen bg-slate-600 flex justify-center items-center">
          <p className="text-white text-3xl font-semibold">Loading....</p>
        </div>
      )}
    </>
  );
}

export default App;
