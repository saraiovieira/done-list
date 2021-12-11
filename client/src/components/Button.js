import React from 'react'

const Button = ({createTodo} ) => {
    return (
        <>
        <button type="button" onClick={createTodo}>
          Add
        </button>  
        </>
    )
}

export default Button
