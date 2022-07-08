import Item from "./Item"

function TodoList(props) {
    return (
        <ul>
            {props.todos.map((todo) => <Item key={todo.id} id={todo.id} text={todo.text} onDelete={props.onDelete} />)}
        </ul>
    )
}

export default TodoList