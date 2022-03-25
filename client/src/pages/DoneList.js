import React, { useState, useEffect } from 'react';
import '../App.css';
import { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI } from '../components/APIHelper';
import NewTask from '../components/NewTask';
import ToDos from '../components/ToDos';

const DoneList = () => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(() => {

        getAllTodosAPI().then((todos) => {
            setTodos(todos)
        });

    }, [])

    const createTodo = async e => {
        e.preventDefault()
        
        if (!todo) {
            return
        }

        const newTodo = await createTodoAPI(todo) 
        setTodos([...todos, newTodo])
        setTodo('')
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
            <NewTask todo={todo} setTodo={setTodo} createTodo={createTodo} />
            <ToDos todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}
            />
        </>
    )
}

export default DoneList
