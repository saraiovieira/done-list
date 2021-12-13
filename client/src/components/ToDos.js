import React from 'react'

const ToDos = ({ todos, updateTodo, deleteTodo }) => {

    return (
        <> 
             <ul>
                {todos.map(({ _id, task}, i) => (
                    <li
                        key={i}
                    >
                    {task}
                    <input 
                        id="todo" 
                        type="checkbox" 
                        defaultChecked={false} 
                        onClick={e => deleteTodo(e, _id)}
                    />
                    <button 
                        type="button"
                        onClick={e => updateTodo(e, _id)}
                    >
                        Edit
                    </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ToDos
