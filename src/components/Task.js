import React from 'react'
import '../styles/TaskStyle.css'
import { ACTIONS } from '../hooks/useInput' 

export default function Task({ text, id, complete, categoryId, dispatch, draggingRef}) {
    
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

    function handleDragStart(e) {
        e.target.classList.add('dragging')
        draggingRef.current = e.target
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging')
        draggingRef.current = null
    }

    return (
        <div className="task" draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>  
            <input type="checkbox" id={ id } checked={complete} onChange={() => {}}/>      
            <label htmlFor={ id } onClick={handleTaskClick}>
                <div className="circle"></div>
                {text}
            </label>
        </div>
    )
}