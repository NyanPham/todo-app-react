import React, { useRef } from 'react';
import '../styles/TextInputFieldStyle.css'
import { ACTIONS } from '../hooks/useInput';

export default function TextInputField(props) {
    const { name, placeholder, categoryId, dispatch} = props
    const inputRef = useRef()

    function handleInputSubmit(e) {
        e.preventDefault()
        if (inputRef.current.value === '' || inputRef.current.value === null)  return

        if (inputRef.current.name === 'category') {
            dispatch({
                type: ACTIONS.ADD_CATEGORY,
                payload: {
                    newCategory: {
                        text: inputRef.current.value ,
                        active: false,
                        tasks: [],
                        id: Date.now().toString()
                    }
                }
            })
        } else if (inputRef.current.name === 'task') {
            dispatch({
                type: ACTIONS.ADD_TASK,
                payload: {
                    categoryId,
                    newTask: {
                        text: inputRef.current.value,
                        id: Date.now().toString(),
                        complete: false,
                    }
                }
            })
        }

        inputRef.current.value = ''
    }

    return (
        <form className="input-form" onSubmit={handleInputSubmit}>
            <input className="input-field" type="text" name={name} placeholder={placeholder} ref={inputRef}/>
            <button className="submit-btn" type="submit">+</button>
        </form>
    )
}
