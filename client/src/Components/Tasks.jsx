import React, { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const Tasks = ({ task, setTask, createTask, tasks, updateTask, deleteTask, editedTask, setEditedTask }) => {
    const [guest, setGuest] = useState();

    useEffect(() => {
        getToken();
    }, []);

    const getToken = () => {
        const token = localStorage.getItem("token");
        if (token === "guest") {
            setGuest(true);
        }
    }

    const editTask = (id) => {
        if (guest) {
            const taskToEdit = tasks.find((t) => t.id === id);
            setEditedTask(taskToEdit);
        } else {
            const taskToEdit = tasks.find((t) => t._id === id);
            setEditedTask(taskToEdit);
        }
    };

    return (
        <>
            <div>
                <h2 className="tasks__title">Congrats! You accomplished ? tasks</h2>
                <ul className="tasks_list">
                    {guest ? (tasks.map(({ title, id }) => (
                        <li
                            key={id}
                        >
                            {editedTask && editedTask.id === id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTask.title}
                                        className="edited"
                                        placeholder='Task name'
                                        autoComplete="off"
                                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                    />
                                    <button onClick={() => updateTask(editedTask.id)}>Save</button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        id="task-complete"
                                        type="checkbox"
                                        defaultChecked={true}
                                        className="completed"
                                    />
                                    <span className="checkmark"></span>
                                    <span className="task">{title}</span>
                                </>
                            )}
                            <div>
                                <MdEdit className="edit_icon" onClick={() => editTask(id)} />
                                <BsFillTrashFill className="trash_icon" onClick={e => deleteTask(e, id)}></BsFillTrashFill>
                            </div>
                        </li>
                    ))) : (tasks.map(({ _id, task }, i) => (
                        <li
                            key={i}
                        >
                            {editedTask && editedTask._id === _id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTask.task}
                                        className="edited"
                                        placeholder='Task name'
                                        autoComplete="off"
                                        onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
                                    />
                                    <button onClick={(e) => updateTask(e, _id)}>Save</button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        id="task-complete"
                                        type="checkbox"
                                        defaultChecked={true}
                                        onClick={(e) => updateTask(e, _id)}
                                        className={"completed"}
                                    />
                                    <span className="checkmark"></span>
                                    <span className='task'>{task}</span>
                                </>
                            )}
                            <MdEdit className="edit_icon" onClick={() => editTask(_id)}></MdEdit>
                            <BsFillTrashFill className="trash_icon" onClick={e => deleteTask(e, _id)}></BsFillTrashFill>
                        </li>
                    )))}
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
