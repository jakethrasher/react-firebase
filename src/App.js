import './App.css';
import React, {useState} from 'react';
import db from './utils/firebase';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleClick = () =>{
    setTodoList(prev=>[...prev, todo]);
    const todoRef = db.ref('Todo');
    const todoItem = {
      todo,
      complete: false,
    }
    todoRef.push(todoItem);
    setTodo('');
  };

  return (
    <div>
      <h2>Todo</h2>
      <input type='text' onChange={(e)=>setTodo(e.target.value)} value={todo}/>
      <button onClick={handleClick}>add</button>
      <section>
        <ul>
          {todoList.map((el, i)=>(
            <li key={`${i}-${el}`}>{el}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
