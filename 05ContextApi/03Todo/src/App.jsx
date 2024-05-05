import { useContext, useEffect, useId, useState } from "react";
import TodoForm from "./components/TodoForm";
import useTodo, { TodoProvider } from "./context/TodoContext";
import TodoItem from "./components/TodoItem";


function App() {
  const [todos, setTodos] = useState([]);

  //1. add todos
  const addTodo = (todo) =>{
    //Take the prev state of "todos" and add the current todo

    setTodos((prevTodos) => [{id: Date.now(), ...todo}, ...prevTodos])
  }

  //2. update todos
  const updateTodo = (id, todo) =>{
                                                    //if todo's id matches with the given todo, then setTodos(todo) or just setTodo(eachTodo) which basically doesn't do anything
    setTodos((prevTodo) => prevTodo.map((eachTodo)=> (eachTodo.id === id ? todo : eachTodo) ))
  }

  //3. delete todo
  const deleteTodo = (id) =>{
    //filter creates a new array with the values that matches the condition
    setTodos((prev)=> prev.filter((todo)=>todo.id !== id))
  }

  //4. toggle status
  const toggleStatus = (id) =>{
    setTodos((prev)=>prev.map((todo)=>todo.id === id ? {...todo, status: !todo.status} : todo))
  }
  
  //localstorage functionalities
  
  //when I load the website, I need the contents from local storage to get displayed
  //NOTE: THE LOCAL STORAGE ACCEPTS AND SEND THE DATA ONLY IN STRING FORMAT
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0) setTodos(todos)

    console.log(todos)
  }, [])

  //whenever there's a change in my todos, i need to store the todos in localstorage
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleStatus}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
           {todos.map((todo)=>(
            <div key={todo.id}>
                 <TodoItem todo={todo} />
            </div>
           ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
