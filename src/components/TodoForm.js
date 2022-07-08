import { useState } from "react"

function TodoForm(props) {
    const [inputValue, setInputValue] = useState('')

    const onChange = (e) => {
        setInputValue(e.target.value)
    }

    const onClick = () => {
        if (inputValue.trim().length > 0) {
            props.onSubmit(inputValue)
            setInputValue('')
        }
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onClick()
        }
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={onChange} onKeyDown={onKeyDown} />
            <button onClick={onClick}>Add</button>
        </div>
    )
}

export default TodoForm