import React, { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todos from './component/Todos';
import './App.css'



const reducer = (state, action)=>{
  switch(action.type){
    case 'ADD':
      const allTodos = [...state.todos, action.payload]
      return{
        ...state,
        todos: allTodos,
      
      }

    case 'EDIT':
      let filterTodos = [...state.todos].filter((todo) => todo.id !== action.payload.id)
      filterTodos.push(action.payload)
      return{
        ...state,
        todos: filterTodos
      }

    case 'REMOVE':
      const deleteTodos = [...state.todos].filter((todo) => todo.id !== action.payload)
      return{
        ...state,
        todos: deleteTodos
      }


    default:
      return state

  }
}

const App = () => {
  const [todoState, dispatch] = useReducer(reducer, {
    todos: [],  
  })

  const [newTodo, setNewTodo] = useState('')
  const [todoId, setTodoId] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const  addTodo= ()=>{
    const item = {id: uuidv4(), name: newTodo}
    dispatch({type:"ADD", payload: item})
  }

  const edit=(todo)=>{
    setNewTodo(todo.name)
    setTodoId(todo.id)
    setIsEdit(true)
    
   // console.log(todoId)
  }


  const editTodo = ()=>{
    const editItem = {id: todoId, name: newTodo}
    setIsEdit(false)
    dispatch({type: 'EDIT', payload: editItem})

  }

  const remove = (id)=>{
    dispatch({type: 'REMOVE', payload: id})
  }

  





  return (
    <div className='app'>
      <h2>Todo APP</h2>
    
        <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} required />
        {isEdit ?
        <button onClick={editTodo}>Edit</button>:
        <button onClick={addTodo}>Add</button>}
        <h2>List of Todos</h2>
        { todoState.todos.length === 0 && <p>...Todos not listed...</p>}
      {todoState.todos && todoState.todos.map((todo) => <Todos selected={remove}  edit={edit} key={todo.id} todo={todo}/>)}
    </div>
  )
}

export default App