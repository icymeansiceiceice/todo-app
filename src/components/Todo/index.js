import React, { useState } from 'react'

export default function Todo({todo,deleteTodo,updateTodo}) {
    let [isEdit,setIsEdit] = useState(false);
    let [title,setTitle] = useState(todo.title);
    let updateTodohandler = (e)=>{
        e.preventDefault();
        let Todo = {
            id : todo.id,
            title,
            completed : todo.completed
        }
        updateTodo(Todo);
        setIsEdit(false);
    }
    let handleCheckbox = ()=>{
      let Todo = {
        id : todo.id,
        title,
        completed : !todo.completed
    }
    updateTodo(Todo);
    }

  return (
    <li className="todo-item-container" >
    <div className="todo-item">
      <input type="checkbox" checked={todo.checked} onChange={handleCheckbox}/>
      {!isEdit && <span className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}  onDoubleClick={()=> setIsEdit(true)}  >{todo.title}</span>}
    {isEdit && 
    <form onSubmit={updateTodohandler}>
        <input type="text" className="todo-item-input" value={title} onChange={(e)=> setTitle(e.target.value)}/>
    </form>
    
    }
    </div>
<button className="x-button" onClick={()=>deleteTodo(todo.id)}>
  <svg
    className="x-button-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>
</li>
  )
}
