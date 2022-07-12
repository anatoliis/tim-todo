import { useMemo } from "react"
import Item from "./Item"
import './TodoList.css'

function TodoList(props) {
    const todos = useMemo(() => props.todos.filter((todo) => !todo.isDeleted), [props.todos])
    const tooltip = useMemo(() => {
        if (todos.length === 0) {
            return ''
        }
        if (!!props.selectedTodoId) {
            return 'Press "ESC" to cancel.'
        } else {
            return 'Click item to edit.'
        }
    }, [todos.length, props.selectedTodoId])

    return (
        <div className='TodoList'>
            <small className="TodoList-tooltip">{tooltip}</small>
            {todos.map((todo) => (
                <Item
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    isSelected={props.selectedTodoId === todo.id}
                    onSelect={props.onSelect}
                    isCompleted={todo.isCompleted}
                    onComplete={props.onComplete}
                    onUncomplete={props.onUncomplete}
                    onDelete={props.onDelete}
                />
            ))}
        </div>
    )
}

export default TodoList