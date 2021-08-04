import './App.css';
import React, {useState, useEffect} from 'react';
import db from './utils/firebase';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const todoRef = db.ref('Todo');

  const handleClick = () =>{
    const todoItem = {
      todo,
      complete: false,
    }
    todoRef.push(todoItem);
    setTodo('');
  };

  useEffect(() => {
    todoRef.on('value', (snapshot)=>{
      let arr = [];
      snapshot.forEach(el=>{
        arr.push(el.val());
      })
      setTodoList(arr);
    })
  }, [])

  return (
    <div>
      <h2>Todo</h2>
      <input type='text' onChange={(e)=>setTodo(e.target.value)} value={todo}/>
      <button onClick={handleClick}>add</button>
      <section>
        <ul>
          {todoList.map((el, i)=>(
            <li key={`${i}-${el}`}>{el.todo}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
