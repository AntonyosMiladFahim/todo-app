import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { useState,useEffect } from 'react';

function App() {

  const [todos,setTodos]=useState([
    {input : 'Hello ,Add your first task', completed: true}
  ]);
  const [selectedTab,setSelectedTab]=useState('Open');

  function handleAddTodo(newTodo){
    const newTodoList=[...todos,{input:newTodo,completed: false}];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
    
  }

  function handleCompleteTodo(index){
    let newTodoList=[...todos];
    let completedtodo=todos[index];
    completedtodo['completed']=!completedtodo['completed'];
    newTodoList[index]=completedtodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);

  }

  function handleDeleteTodo(index){
    let newTodoList=todos.filter((val,valIndex)=>{
      return valIndex!==index;
    })
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currtodos){
    localStorage.setItem('todo-app',JSON.stringify({todos:currtodos}));
  }

  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app'))return;
    let db=JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
  },[])

  return (
    <>
      <Header todos={todos}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
