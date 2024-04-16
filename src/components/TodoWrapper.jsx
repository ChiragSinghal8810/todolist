import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    // to add new tasks in TODO list
    const addTodo = todo => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    // to mark tasks as done in TODO list
    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    // to delete existing tasks in TODO list
    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    // to update existing tasks in TODO list
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  return (
    <div className='TodoWrapper'>
        <h1>Add your Tasks todo</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
         
    </div>
  );
};