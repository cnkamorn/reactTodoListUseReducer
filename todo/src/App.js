import logo from './logo.svg';
import './App.css';
import React, { useState, useContext,useReducer, memo, createContext, } from 'react';
import { todoReducer,initialState,addAction,deleteAction,markAction } from './todo';

const TodosContext = createContext(null);
function App() {
  const [todoList,dispatch] = useReducer(todoReducer,initialState);
  return (
   <TodosContext.Provider value={dispatch}>
  <div className="App">
    <InputTask />
    <h3>Tasks</h3>
    <TaskList tasks={todoList} />
   </div>
   </TodosContext.Provider>
  )
}

const markWith = (mark) => {
  return id => markAction(id,mark)
}
const TaskList = ({tasks}) => {
  return (
    <>
    <ol>
    {tasks.map((task,id)=> {
     return (
      <li key={id}>
   <span className={task.done ? "cross-out" : ""}>{task.name} </span> 
   {!task.done && (   <Action id={id} action={markWith(true)}>Done</Action>
)}
   {task.done && (   <Action id={id} action={markWith(false)}>Undo</Action>
)}
  <Action id={id} action={deleteAction}>Delete</Action>
      </li>
     )
    })}
    </ol>
    </>
  )
}

const Form = () => {
  const [task,setTask] = useState("");
  const dispatch = useContext(TodosContext);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addAction(task))
    setTask("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="task" autoComplete="off" placeholder="Add a task" value={task} onChange={e => {
        setTask(e.target.value)
      }}/>
      <button type="submit">
        Add
      </button>
    </form>
  )
}
const Action = ({id,className,action,children}) => {
  const dispatch = useContext(TodosContext);
  return (
    <button onClick={()=> {
      dispatch(action(id))
    }}>
      {children}
    </button>
  )
}
const InputTask = React.memo(Form)

export default App;
