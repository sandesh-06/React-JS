import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo } from '../features/todoSlice'

const AllTodos = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state)=> state.todos)

    const handleUpdate = (e)=>{
        
    }
  return (
    <div>
        <ul>
            {todos.map((todo)=>(
                <li key={todo.id}>{todo.text}
                 <button onClick={()=>dispatch(removeTodo(todo.id))}>x</button>
                 <button onClick={handleUpdate}>update</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default AllTodos