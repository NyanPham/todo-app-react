import React from 'react'
import '../styles/TaskStyle.css'
import { ACTIONS } from '../hooks/useInput' 

export default function Task({ text, id, complete, categoryId, dispatch}) {

    function handleTaskClick() {
        dispatch({
            type: ACTIONS.COMPLETE_TASK,
            payload: {
                categoryId,
                taskId: id,
                complete
            }
        })
    }

    return (
        <div className="task">  
            <input type="checkbox" id={ id } checked={complete} onChange={() => {}}/>      
            <label htmlFor={ id } onClick={handleTaskClick}>
                <div className="circle"></div>
                {text}
            </label>
        </div>
    )
}