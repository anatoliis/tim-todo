import classNames from "classnames"
import { useCallback, useState } from "react"
import "./Item.css"

function Item(props) {
    const [hover, setHover] = useState(false)

    const onMouseOver = useCallback(() => {
        setHover(true)
    }, [])
    const onMouseLeave = useCallback(() => {
        setHover(false)
    }, [])
    const onSelect = useCallback(() => {
        props.onSelect(props.id)
    }, [props])
    const onDeleteClick = useCallback((e) => {
        e.stopPropagation()
        props.onDelete(props.id)
    }, [props])
    const onCompleteClick = useCallback((e) => {
        e.stopPropagation()
        props.onComplete(props.id)
    }, [props])
    const onUncompleteClick = useCallback((e) => {
        e.stopPropagation()
        props.onUncomplete(props.id)
    }, [props])

    const divClassName = classNames("Item", {"Item-selected": props.isSelected})
    const textSpanClassName = classNames({"Item-text-completed": props.isCompleted})
    return (
        <div
            className={divClassName}
            onClick={onSelect}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            title="Click to edit"
        >
            <span className={textSpanClassName}>{props.text}</span>&nbsp;
            <span className="Item-buttons-container">
                <button
                    style={{display: (hover && !props.isCompleted) ? 'block' : 'none'}}
                    onClick={onCompleteClick}
                >✓</button>
                <button
                    style={{display: (hover && props.isCompleted) ? 'block' : 'none'}}
                    onClick={onUncompleteClick}
                >╳</button>&nbsp;
                <button onClick={onDeleteClick}>Delete</button>
            </span>
        </div>
    )
}

export default Item