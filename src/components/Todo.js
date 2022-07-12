import { useCallback, useEffect, useMemo, useState } from "react"
import Counters from "./Counters"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"

const TODOS_URL = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'

class TodoStorage {
    constructor(key) {
        this.key = key
    }

    read() {
        const item = localStorage.getItem(this.key)
        if (item === null) {
            return []
        }
        return JSON.parse(item)
    }

    save(todos) {
        localStorage.setItem(this.key, JSON.stringify(todos))
    }

    clear() {
        localStorage.removeItem(this.key)
    }
}

const todoStorage = new TodoStorage('todos')

function Todo() {
    const initialTodos = useMemo(() => todoStorage.read(), [])
    const [todos, setTodos] = useState(initialTodos)
    todos.sort((a, b) => a.isCompleted - b.isCompleted)
    const [inputValue, setInputValue] = useState('')
    const [selectedTodoId, setSelectedTodoId] = useState()

    const counters = useMemo(() => ({
        total: todos.filter((t) => !t.isDeleted).length,
        created: todos.length,
        edited: todos.filter((t) => !!t.wasEdited).length,
        completed: todos.filter((t) => !!t.isCompleted).length,
        deleted: todos.filter((t) => !!t.isDeleted).length
    }), [todos])

    useEffect(() => {
        todoStorage.save(todos)
    }, [todos])

    useEffect(() => {
        fetch(TODOS_URL).then(
            (response) => response.json()
        ).then((data) => {
            setTodos((todos) => {
                const existingIds = new Set(todos.map((t) => t.id))
                const newTodos = data.filter((t) => !existingIds.has(t.id))
                return [...newTodos, ...todos]
            })
        })
    }, [])

    const addTodo = useCallback((value) => {
        const todo = {
            id: crypto.randomUUID(),
            text: value,
            isCompleted: false,
            isDeleted: false,
            wasEdited: false
        }
        setTodos((previous) => [todo, ...previous])
    }, [])

    const editTodo = (todoId, text) => {
        const todo = todos.find((t) => t.id === todoId)
        if (todo !== undefined) {
            todo.text = text
            todo.wasEdited = true
            setTodos([...todos])
        }
        setSelectedTodoId(undefined)
    }

    const cancelTodoEdit = useCallback(() => {
        setSelectedTodoId(undefined)
        setInputValue('')
    }, [])

    const deleteTodo = useCallback((todoId) => {
        if (selectedTodoId === todoId) {
            cancelTodoEdit()
        }
        setTodos((todos) => {
            const todo = todos.find((todo) => todo.id === todoId)
            todo.isDeleted = true
            return [...todos]
        })
    }, [selectedTodoId, cancelTodoEdit])

    const selectTodoForEdit = (todoId) => {
        const todo = todos.find((t) => t.id === todoId)
        if (todo === undefined) {
            return
        }
        setSelectedTodoId(todoId)
        setInputValue(todo.text)
    }

    const onFormSubmit = () => {
        if (inputValue.trim().length === 0) {
            return
        }
        if (selectedTodoId !== undefined) {
            editTodo(selectedTodoId, inputValue.trim())
        } else {
            addTodo(inputValue.trim())
        }
        setInputValue('')
    }

    const completeTodo = useCallback((todoId) => {
        setTodos((todos) => {
            const todo = todos.find((t) => t.id === todoId)
            if (todo === undefined) {
                return todos
            }
            todo.isCompleted = true
            cancelTodoEdit()
            return [...todos]
        })
    }, [cancelTodoEdit])

    const uncompleteTodo = useCallback((todoId) => {
        setTodos((todos) => {
            const todo = todos.find((t) => t.id === todoId)
            if (todo === undefined) {
                return todos
            }
            todo.isCompleted = false
            cancelTodoEdit()
            return [...todos]
        })
    }, [cancelTodoEdit])

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.keyCode === 27) {
                cancelTodoEdit()
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [cancelTodoEdit])

    const clearStorage = useCallback(() => {
        todoStorage.clear()
        setTodos([])
        cancelTodoEdit()
    }, [cancelTodoEdit])

    return (
        <div>
            <Counters counters={counters} />
            <button onClick={clearStorage}>Clear storage</button>
            <TodoForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSubmit={onFormSubmit}
                submitButtonName={!!selectedTodoId ? 'Save' : 'Add'}
                onCancel={!!selectedTodoId ? cancelTodoEdit : undefined}
            />
            <TodoList
                todos={todos}
                onDelete={deleteTodo}
                onComplete={completeTodo}
                onUncomplete={uncompleteTodo}
                selectedTodoId={selectedTodoId}
                onSelect={selectTodoForEdit}
            />
        </div>
    )
}

export default Todo