import { useState } from "react";

export function TodoInput(props){
    const {handleAddTodo}=props;
    const [inputValue,setInputValue]=useState('');

    const handleClick = () => {
        if(!inputValue)return;
        handleAddTodo(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();  
        }
    };

    return (
        <div className="input-container">
            <input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onKeyDown={handleKeyDown} placeholder="Add task" />
            <button onClick={handleClick}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}