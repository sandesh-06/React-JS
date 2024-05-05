import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = (e)=>{
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('')
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="enter todo" />
        <button type="submit">Add Todo</button>
      </form>
    </>
  );
};

export default AddTodo;
