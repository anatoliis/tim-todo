function Item(props) {
    const onClick = () => {
        props.onDelete(props.id)
    }
    return (
        <li>
            <span>{props.text}</span>&nbsp;
            <button onClick={onClick}>Delete</button>
        </li>
    )
}

export default Item