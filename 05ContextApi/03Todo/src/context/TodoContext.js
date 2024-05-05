import { createContext, useContext } from "react";


export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            task: "Okayy now",
            status: false,
        }
    ],
    addTodo: (todo)=>{},
    updateTodo: (id, todo)=>{},
    deleteTodo: (id)=>{},
    toggleStatus: (id)=>{},
});

export const TodoProvider = TodoContext.Provider;

//custom hook
const useTodo = () => {
    return useContext(TodoContext);
}
export default useTodo;