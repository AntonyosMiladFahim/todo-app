import { TodoCard } from './TodoCard';

export function TodoList(props){
    const {todos,selectedTab} = props;
    
    
    const filtertodolist=selectedTab==='All'?todos:
    selectedTab==='Open'?todos.filter(val=>!val.completed):
    todos.filter(val=>val.completed);
    return(
        <>
            {filtertodolist.map((todo,todoIndex)=>{
                return(
                    <TodoCard {...props} todoIndex={todos.findIndex(val=>val.input==todo.input)} key={todoIndex} todo={todo}/>
                )
            })}
        </>
    ) 
}