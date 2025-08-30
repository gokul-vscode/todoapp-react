import React, { useState } from 'react';
import './TodoApp.css';

function App(){
  const [tasks,setTasks] = useState([]);
  const [input,setInput] = useState('');
  const [editId,setEditId] = useState(null);
  const [editText,setEditText] = useState('');

  const handleAddTask = ()=>{
    if(!input.trim()) return;

    const newTask={
      id:Date.now(),
      text:input,
      completed:false
    };

    setTasks([newTask, ...tasks])
    setInput('');
  };

  const handleDelete =(id)=>{
    setTasks(tasks.filter(task=>task.id !==id));
  };

  const handleToggleComplete =(id)=>{
    setTasks(tasks.map(task=>
      task.id ===id?{...task  ,completed: !task.completed}:task
    ));
  };

  const handleEdit =(id,text)=>{
    setEditId(id);
    setEditText(text);
  };
 
  const handleSaveEdit = (id)=>{
    setTasks(tasks.map(task=>
      task.id===id?{...task,text:editText}:task
    ));
    setEditId(null);
    setEditText('');
  };
  return(
    <div className='App'>
      <h1>To-do App</h1>
      <div className='input-section'>
        <input type="text" value={input} placeholder='Add a New Task'onChange={(e)=>setInput(e.target.value)} />
        <button onClick={handleAddTask} className='add-btn'>ADD</button>
      </div>
      <ul className='task-list'>
        {tasks.map(task=>(
        <li key={task.id} className= {task.completed ? 'completed' : ''}>
          {editId===task.id?(
          <>
            <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} />
            <button onClick={()=>handleSaveEdit(task.id)}>Save</button>
            <button onClick={()=>setEditId(null)}>Cancel</button>
          </>
          ):(
          <>
            <span onClick={()=>handleToggleComplete(task.id)}>{task.text} </span>
            <button onClick={()=>handleEdit(task.id,task.text)}>Edit</button>
            <button onClick={()=>handleDelete(task.id)}>Delete</button>
          </>
          )}
        </li>
        ))}
      </ul>
    </div>
  )
}
export default App;



