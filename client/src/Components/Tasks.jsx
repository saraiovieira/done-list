import React, { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const Tasks = ({ task, setTask, createTask, tasks, updateTask, deleteTask, editedTask, setEditedTask }) => {
    const [guest, setGuest] = useState();
    const [encouragementMessage, setEncouragementMessage] = useState('');


    const handleEncourageClick = () => {
        setEncouragementMessage("Remember why you started. Align your tasks with your goals.");
    };

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

    const taskCount = tasks.length;

    return (
        <>
            <div>
                {tasks.length === 0 ? (
                    <div className="tasks__empty-container">
                        <h2  className="tasks__title">No tasks done yet!</h2>
                        <p className="tasks__description">Complete a task to make progress.</p>
                        <button className="tasks__encouragement-button" onClick={handleEncourageClick}>Encourage me!</button>
                        {encouragementMessage && (
                            <div className="tasks__encouragement">
                                <p className="tasks__encouragement-message">{encouragementMessage}</p>
                                <div className="tasks__encouragement-gif-container">
                                    <img className="tasks__encouragement-gif" src="/giphy.gif" alt="Encouragement GIF" />
                                    <p className="tasks__encouragement-source"><a href="https://giphy.com/gifs/Dapulse-celebration-green-l0Iybn1vpbUzeqkqQ">via GIPHY</a></p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (<h2 className="tasks__title">Congrats! You accomplished {taskCount} tasks</h2>)}
                <ul className="tasks__list">
                    {guest ? (tasks.map(({ title, id }) => (
                        <li
                            key={id}
                            className="tasks__item"
                        >
                            {editedTask && editedTask.id === id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTask.title}
                                        className="tasks__input-edited"
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
                                        className="tasks__input-completed"
                                    />
                                    <span className="tasks__checkmark"></span>
                                    <span className="tasks__task">{title}</span>
                                </>
                            )}
                            <div>
                                <MdEdit className="tasks__edit-icon" onClick={() => editTask(id)} />
                                <BsFillTrashFill className="tasks__trash-icon" onClick={e => deleteTask(e, id)}></BsFillTrashFill>
                            </div>
                        </li>
                    ))) : (tasks.map(({ _id, task }, i) => (
                        <li
                            key={i}
                            className="tasks__item"
                        >
                            {editedTask && editedTask._id === _id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTask.task}
                                        className="tasks__input-edited"
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
                                        className="tasks__input-completed"
                                    />
                                    <span className="tasks__checkmark"></span>
                                    <span className='tasks__task'>{task}</span>
                                </>
                            )}
                            <div>
                                <MdEdit className="tasks__edit-icon" onClick={() => editTask(_id)}></MdEdit>
                                <BsFillTrashFill className="tasks__trash-icon" onClick={e => deleteTask(e, _id)}></BsFillTrashFill>
                            </div>
                        </li>
                    )))}
                </ul>
                <form className="tasks__add-form" onSubmit={createTask}>
                    <input
                        type="text"
                        id="new-task-input"
                        value={task}
                        onChange={({ target }) => setTask(target.value)}
                        placeholder='Task name'
                        autoComplete="off"
                        className="tasks__input"
                    />
                    <button type="submit" className="tasks__button">
                        Add task
                    </button>
                </form>
            </div>
        </>
    )
};

export default Tasks