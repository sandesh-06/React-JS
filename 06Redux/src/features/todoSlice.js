import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //1. reducer to add todo
        addTodo: (state, action)=>{
            const newTodo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(newTodo)
        },

        //2. to remove a todo
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=>(
                todo.id !== action.payload
            ))
        },

        //3. update todo
        updateTodo: (state, action)=>{
           state.todos.forEach((todo)=>{
            if(todo.id === action.payload.id){
                todo.text = action.payload.text
            }
           })
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions //to use in components

export default todoSlice.reducer //to use in store