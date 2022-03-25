import React from 'react';

const NewTask = ({ todo, setTodo, createTodo }) => {
    return (
        <>
            <form onSubmit={createTodo}>
                <input
                    type="text"
                    id="new-todo-input"
                    value={todo}
                    onChange={({ target }) => setTodo(target.value)}
                    placeholder='Task name'
                    autoComplete="off"
                />
                <button 
                    type="submit"  
                >
                    Add task
                </button>  
            </form>
        </>
    )
}

export default NewTask
