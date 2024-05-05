import React, { useContext, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Using the data/function from the context
  const {setUserDetails} = useContext(UserContext);
  
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    setUserDetails({username, password})
    navigate("/profile")
  }
  const bindId = useId();
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-slate-500 p-10 rounded-lg">
        <form action="">
          <label htmlFor={bindId} className="font-mono text-3xl font-semibold">
            UserName:
          </label>
          <br />
          <input
            id={bindId}
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            placeholder="enter username"
            className="rounded-sm p-2 mb-5"
          />
          <br />
          <label htmlFor={bindId} className="font-mono text-3xl font-semibold">
            Password:
          </label>
          <br />
          <input
            id={bindId}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="text"
            placeholder="enter password"
            className="rounded-sm p-2 mb-7"
          />
          <br />
          <Link to="/profile">
            <button onClick={handleSubmit} className="bg-blue-700 text-slate-300 p-3 text-xl font-semibold rounded-md shadow-xl">
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
