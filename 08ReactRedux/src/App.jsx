import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"

function App() {


  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center pt-10">
     <AddTodo/>
     <Todos/>
    </div>
  )
}

export default App
