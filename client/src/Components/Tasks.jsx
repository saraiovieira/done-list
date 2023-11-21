import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const Tasks = ({ task, setTask, createTask, tasks, updateTask, deleteTask }) => { 
    const [newTask, setNewTask] = useState("");
   
    const [editId, setEdit] = useState(false);    

    const editTask = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    return (
        <>
        <div>
            <h2 className="tasks__title">Congrats! You accomplished ? tasks</h2>
            <ul className="tasks_list">
                {tasks.map(({ _id, task, completed}, i) => (
                    <li
                        key={i}
                    >
                    <input 
                        id="task-complete" 
                        type="checkbox" 
                        defaultChecked={true} 
                        onClick={e => updateTask(e, _id)}
                        className={completed ? "completed" : ""}
                    />
                    <span className="checkmark"></span>
                    <span className='task'>{task}</span>
                    <div>
                        <MdEdit className="edit_icon" onClick={editTask}></MdEdit>
                        <BsFillTrashFill className="trash_icon" onClick={e => deleteTask(e, _id)}></BsFillTrashFill>
                    </div>
                    </li>
                ))}
            </ul>
            <form className="add-tasks" onSubmit={createTask}>
                    <input
                        type="text"
                        id="new-task-input"
                        value={task}
                        onChange={({ target }) => setTask(target.value)}
                        placeholder='Task name'
                        autoComplete="off"
                    />
                    <button type="submit">
                        Add task
                    </button>  
                </form>
            </div>
        </>
    )
};

export default Tasks
