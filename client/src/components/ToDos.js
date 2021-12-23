import React from 'react'

const ToDos = ({ todos, updateTodo, deleteTodo }) => {

    return (
        <> 
             <ul>
                {todos.map(({ _id, task, completed}, i) => (
                    <li
                        key={i}
                        onClick={e => updateTodo(e, _id)}
                        className={completed ? "completed" : ""}
                    >
                    {task}
                    <input 
                        id="todo-delete" 
                        type="checkbox" 
                        defaultChecked={false} 
                        onClick={e => deleteTodo(e, _id)}
                    />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ToDos
