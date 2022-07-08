import { useState } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"

function Todo() {
    const [todos, setTodos] = useState([])

    const addTodo = (value) => {
        const todo = {
            id: crypto.randomUUID(),
            text: value
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const deleteTodo = (todoId) => {
        const newTodos = todos.filter((todo) => todo.id !== todoId)
        setTodos(newTodos)
    }

    return (
        <div>
            <TodoList todos={todos} onDelete={deleteTodo} />
            <TodoForm onSubmit={addTodo} />
        </div>
    )
}

export default Todo