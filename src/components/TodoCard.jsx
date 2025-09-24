export function TodoCard(props){
    const {todo,handleDeleteTodo,todoIndex,handleCompleteTodo}=props;
    
    // console.log(todo);

    return(

        <div className="todo-item card">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button disabled={todo.completed} onClick={()=>{handleCompleteTodo(todoIndex)}}>
                    <h6>Done</h6>
                </button>
                <button onClick={()=>{handleDeleteTodo(todoIndex)}}>
                    <p>Delete</p>
                </button>
            </div>

        </div>
    )
}