import './Counters.css'

function Counters(props) {
    return (
        <div>
            <span>Counters</span><br />
            <div className="Counters-container">
                <span>Total: {props.counters.total}</span><br />
                <span>Created: {props.counters.created}</span><br />
                <span>Edited: {props.counters.edited}</span><br />
                <span>Completed: {props.counters.completed}</span><br />
                <span>Deleted: {props.counters.deleted}</span><br />
            </div>
        </div>
    )
}

export default Counters