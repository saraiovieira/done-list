import React from 'react';

const ToDo = (todo, setTodo) => {      
    return (
        <>
            <input
            type="text"
            id="new-todo-input"
            value={todo}
            onChange={({ target }) => setTodo(target.value)}
            placeholder='Enter a todo'
            autoComplete="off"
            /> 
        </>
    )
}

export default ToDo
