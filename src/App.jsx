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
  const [history, setHistory] = useState([]);

  function saveToHistory(currTodos) {
    setHistory((prev) => [...prev, currTodos]);
  }

  function handleAddTodo(newTodo){
    const newTodoList=[...todos,{input:newTodo,completed: false}];
    saveToHistory(todos);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
    
  }

  function handleCompleteTodo(index){
    let newTodoList=[...todos];
    let completedtodo=todos[index];
    completedtodo['completed']=!completedtodo['completed'];
    newTodoList[index]=completedtodo;
    saveToHistory(todos);
    setTodos(newTodoList);
    handleSaveData(newTodoList);

  }

  function handleDeleteTodo(index){
    let newTodoList=todos.filter((val,valIndex)=>{
      return valIndex!==index;
    });
    saveToHistory(todos);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currtodos){
    localStorage.setItem('todo-app',JSON.stringify({todos:currtodos}));
  }

  function handleUndo() {
    if (history.length === 0) return; 
    const previousTodos = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1)); 
    setTodos(previousTodos);
    handleSaveData(previousTodos);
  }

  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app'))return;
    let db=JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
  },[])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

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
