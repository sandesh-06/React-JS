# Understand The Code

### Redux Terms:

Before moving on to the flow let's look at some terms used in `Redux`.

- `store`: It's like a global variable where all the datas are available.
- `slice`: We can say it's a division of the store. (i.e) a store is divided into slices and the slices are accessed using `reducer` from the store.
- `useDispatch`: to dispatch a action to the `store`
- `useSelector`: to access the state of the store. (The state contains all the datas we need).
---
### Redux Environment Setup:
#### 1. Create a store:
```javascript
import { configureStore } from "@reduxjs/toolkit"
export const store = configureStore({})
```
This store will contain all the datas in form of `reducer`. 
#### 2. Create a slice.
```javascript
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
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions; //for the components
export default todoSlice.reducer; // .reducer turns the slice into a reducer which is used in the store
```
- This slice is responsible for all the todo actions.
- `initialState` as the name suggests, it the initial state of the slice.
- The state can be updated only using reducers defined in the slice.
- `reducers`:
```javascript
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
    }
})
```
- The `reducers` contain list of function which performs some action on the state.  
- It takes two parameters `state` and `action`. 
- `state` gives the currect state of data (i.e) in this code, we can access the current state of todos by `state.todos`. Since the state get's preserved automatically we can make changes directly to the state.
- In `ContextAPI` the state is not preserved so we had to use the spread operator to get the previous state.
- `action` contains the payload/data that is send from the component.  

We need to export the functions in the reducers seperately as it will be used in the components.  
```javascript
export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;
```
  
Then convert and export this slice as a `reducer` so that it can be used in the `store`.
```javascript
export default todoSlice.reducer;
```

#### 3. Import reducer in store.
```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"

export const store = configureStore({
    reducer: todoReducer
})
```
since we are exporting the `todoSlice.reducer` as default, we can give custom name while importing.

#### 4. Provide the store.
- We used to give access to the data by wrapping the components using a `Provider` in `ContextAPI`.  
- `Redux` also follows the same method. Here you wrap the components with `Provider` by giving access to the `store`.
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>
)
```
The set up is done. Now let's understand how to send and fetch data by understanding the flow of data.  

---
### Flow of Redux:
Understand how the data flows is very essential when comes to redux state management.  
Let's look at our code to understand the flow.

#### 1. Dispatch an action:
```javascript
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
      .
      . 
      .
```
- Here we have dispatched an action for `addTodo` using `useDispatch`.
- The `dispatch` function now sends the action to the `store` as:
```javascript
{
    type: 'todo/addTodo'
    payload: "<text>"
}
```
#### 2. Reducer matching in store:
Once the action is dispatched to the store, the store now looks for the reducer that matches with the name given in `type`.

In our example the name of the reducer is `todo`, so store looks for the reducer with the name `todo` to dispatch the action.
```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"

export const store = configureStore({
    reducer: todoReducer
})
```
You may wonder there's no reducer with the name `todo`. If you clearly notice that while creating the slice we have given a name to the slice
```javascript
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
```
So when we convert a slice into reducer,  the name automatically goes for the reducer too.

#### 3. Action is done.
Once the store matches the reducer with name, the action given in `type` which is `addTodo` in our case is fired and the state is changed accordingly.

#### 4. Fetching data from store.

We can fetch the data in store from the current state of the store using the `useSelector` hook.
```javascript
import { useSelector } from 'react-redux'
const Todos = () => {
    const todos = useSelector(state => state.todos)
```
The state of store looks like this:
```javascript
{
   todos: ["<default value>"]
}
```

Suppose there were slice for authToken as well, then the state of store would look like:
```javascript
{
    todos: ["<default value>"],
    authToken: null
}
```
So we can directly fetch the data from state of the `store` using `useSelector` hook.  
#### NOTE: FOR MULTIPLE REDUCERS IN STORE
```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"

export const store = configureStore({
    reducer: {
        todoReducer,
        loginReducer,
        authReducer
    }
})
```  
**From this list of reducers if you need to access the ***todos*** in `todoReducer` from the state of `store`, we need to:**
```javascript
import { useSelector } from 'react-redux'
const Todos = () => {
    const todos = useSelector(state => state.todoReducer.todos)
```