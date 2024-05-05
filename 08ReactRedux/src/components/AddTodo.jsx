import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
const AddTodo = () => {
  const [todo, setTodo] = useState("");

  //to dispatch the action to the store
  const dipatch = useDispatch()

  const addTodoHandler = (e) =>{
    e.preventDefault();

    dipatch(addTodo(todo))
    setTodo("") //clean the todo value
  }
  return (
    <div className="flex flex-col items-center w-1/2">
      <h1 className="text-3xl font-mono text-pink-950 font-bold">Your Todos</h1>
      <form onSubmit={addTodoHandler} className="flex w-full p-5 justify-center" action="">
        <input
          type="text"
          className="w-1/2 p-2 outline-none bg-slate-300 rounded-l-sm font-mono text-xl"
          value={todo}
          onChange={(e)=>setTodo(e.target.value)}
        />
        <button className="bg-pink-400 p-2 rounded-r-lg font-mono font-semibold" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
