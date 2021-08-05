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
  
  const handleComplete = (id) =>{
    
  };

  const handleDel = (id) =>{
    const todoDel = todoRef.child(id);
    todoDel.remove();
  };
  
  useEffect(() => {
    todoRef.on('value', (snapshot)=>{
      let arr = [];
      const todosObj=snapshot.val();
      for(let key in todosObj){
        arr.push({key, ...todosObj[key]})
      }
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
          {todoList && todoList.map((el, i)=>(
            <div key={`${i}-${el}`}>
              <li>
                {el.todo}
                <button onClick={()=>handleComplete(el.key)}>&#10003;</button>
                <button onClick={()=>handleDel(el.key)}>x</button>
              </li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
