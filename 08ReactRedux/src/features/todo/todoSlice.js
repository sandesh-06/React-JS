import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[
        {
            id: 1,
            text: "Hellow"
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            //since the state is preserved
            state.todos.push(todo)
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        },
        // updateTodo: (state, action)=>{
        //     state.map((todo)=>todo.id === action.id ? {...todo, text:action.payload.text} : todo)
        // }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions; //for the components
export default todoSlice.reducer; // .reducer turns the slice into a reducer which is used in the store