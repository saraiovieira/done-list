import React, { useState, useEffect } from 'react';
import '../App.css';
import { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI } from '../components/APIHelper';
import Button from '../components/Button';
import ToDo from '../components/ToDo';
import ToDos from '../components/ToDos';

const TodoList = () => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
        const todos = await getAllTodosAPI()
        setTodos(todos)
        }
        fetchTodoAndSetTodos()
    }, [])

    const createTodo = async e => {
        e.preventDefault()
        if (!todo) {
        // check if the todo is empty
        alert("please enter something")
        return
        }
        if (todos.some(({ task }) => task === todo)) {
        // check if the todo already exists
        alert(`Task: ${todo} already exists`)
        return
        }
        const newTodo = await createTodoAPI(todo) // create the todo
        setTodos([...todos, newTodo]) // adding the newTodo to the list
    }

    const deleteTodo = async (e, id) => {
        try {
        e.stopPropagation()
        await deleteTodoAPI(id)
        setTodos(todos.filter(({ _id: i }) => id !== i))
        } catch (err) {}
    }

    const updateTodo = async (e, id) => {
        e.stopPropagation()
        const newTodo = {
        completed: !todos.find(todo => todo._id === id).completed,
        }
        const updatedTodo = await updateTodoAPI(id, newTodo)
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
    }
    return (
        <>
            <ToDo todo={todo} setTodo={setTodo}/>
            <Button createTodo={createTodo}/>
            <ToDos todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}
            />
        </>
    )
}

export default TodoList
