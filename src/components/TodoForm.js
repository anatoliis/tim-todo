import { useCallback } from "react"
import "./TodoForm.css"

function TodoForm(props) {
    const onChange = useCallback((e) => {
        props.setInputValue(e.target.value)
    }, [props])

    const onKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            props.onSubmit()
        }
    }, [props])

    return (
        <div className="TodoForm">
            <input className="TodoForm-input" type="text" value={props.inputValue} onChange={onChange} onKeyDown={onKeyDown} rows='2' />
            <button className="TodoForm-button" onClick={props.onSubmit}>{props.submitButtonName}</button>
            {!!props.onCancel && <button className="TodoForm-button" onClick={props.onCancel}>Cancel</button>}
        </div>
    )
}

export default TodoForm