import React from 'react';
import './Todos.css';
import {BsPencilSquare} from 'react-icons/bs'
import {BiTrash} from 'react-icons/bi'
const Todos = ({todo, edit, selected}) => {
  return (
    <div className='todos'>
        <p>{todo.name}</p>
        <div className='btn'>
        <button onClick={()=> edit(todo)}><span className='edit'><BsPencilSquare/></span></button>
        <button onClick={()=> selected(todo.id)}><span className='delete'><BiTrash/></span></button>
        </div>
        
    </div>
  )
}                    

export default Todos