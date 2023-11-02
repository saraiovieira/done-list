import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const ToDos = ({ todo, setTodo, createTodo, todos, updateTodo, deleteTodo }) => {
    const [newTask, setNewTask] = useState("");
    
    const [editId, setEdit] = useState(false);    

    const editTodo = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    return (
        <>
        <div>
            <h2>Your Accomplishments</h2>
            <form onSubmit={createTodo}>
                    <input
                        type="text"
                        id="new-todo-input"
                        value={todo}
                        onChange={({ target }) => setTodo(target.value)}
                        placeholder='Task name'
                        autoComplete="off"
                    />
                    <button type="submit">
                        Add task
                    </button>  
                </form>
            <ul className="tasks_list">
                {todos.map(({ _id, task, completed}, i) => (
                    <li
                        key={i}
                    >
                    <input 
                        id="todo-complete" 
                        type="checkbox" 
                        defaultChecked={true} 
                        onClick={e => updateTodo(e, _id)}
                        className={completed ? "completed" : ""}
                    />
                    {task}
                    <MdEdit onClick={editTodo}></MdEdit>
                    <BsFillTrashFill onClick={e => deleteTodo(e, _id)}></BsFillTrashFill>
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
};

export default ToDos
