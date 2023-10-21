import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CheckAllAndRemainding from './components/CheckAllAndRemainding';
import Clear from './components/Clear/Index';
import Filter from './components/Filter';
import Form from './components/Form';
import List from './components/TodoList';

function App() {

  let [todos,setTodos] = useState([]);
  let [filtertodos,setFilterTodos] = useState(todos);

  useEffect(()=>{
    fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then( todo => {
      setTodos(todo)
      setFilterTodos(todo)
    } )
    .catch(err => console.log(err))
  },[])

  let filterBy = useCallback((filter)=>{
    if(filter === 'All'){
      setFilterTodos(todos);
    }
    if(filter === 'Active'){
      setFilterTodos(todos.filter(data=>!data.completed))
    }
    if(filter === 'Completed'){
      setFilterTodos(todos.filter(data=>data.completed))
    }
  },[todos])

  let addTodo = (todo)=>{
    fetch('http://localhost:3001/todos',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    });
      setTodos((prevState) => [...prevState,todo] );
  }

  let deleteTodo = (id)=>{
    fetch(`http://localhost:3001/todos/${id}`,{
      method: "DELETE",
    })
    setTodos((prevState) =>{
      return prevState.filter((todo)=> todo.id !== id)
    });
  }

  let updateTodo = (todo)=>{
    fetch(`http://localhost:3001/todos/${todo.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    });

    setTodos((prevState) =>{
      return prevState.map((data)=> {
        if(data.id === todo.id){
          return todo;
        }
        return data;
      })
    });
  }

  let checkAll = ()=>{
    todos.forEach(data => {
        data.completed =true;
        updateTodo(data);
    });
    setTodos((prevState)=>{
      return prevState.map((data)=>{
        return {...data,completed:true}
      })
    })
  };

  let remainingCount = todos.filter(data => !data.completed).length;

  let clearComplete = ()=>{
    todos.forEach(data=>{
      if(data.completed){
        deleteTodo(data.id);
      }
    })
    setTodos((prevState)=>{
      return prevState.filter(data => !data.completed);
    })
  }

  return (
    <div className="todo-app-container">
    <div className="todo-app">
      <h2>Todo App</h2>

      <Form addTodo={addTodo}/>
      <List  todos={filtertodos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      <CheckAllAndRemainding remainingCount ={remainingCount} checkAll={checkAll}/>

      <div className="other-buttons-container">
        <Filter filterBy={filterBy}/>
        <Clear clearComplete={clearComplete}/>
      </div>

    </div>
  </div>
  );
}

export default App;
