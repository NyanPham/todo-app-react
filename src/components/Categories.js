import React from 'react';
import TextInputField from './TextInputField'
import '../styles/CategoriesStyle.css'
import { ACTIONS } from '../hooks/useInput'

export default function Categories(props) {
    const { 
        categories,
        dispatch
     } = props
 
    function handleSelectCategory(categoryId) {
        dispatch({
            type: ACTIONS.SELECT_CATEGORY,
            payload: { categoryId }
        })
    }
    return (
        <div className="categories">
            <h3>Lists</h3>
            <ul className="categories-list">
                {categories?.map((category, index) => {
                    return (
                        <li 
                            className={`category ${category.active ? 'active-category' : ''}`} //need styling later
                            key={`category_${index}`}
                            onClick={() => handleSelectCategory(category.id)}
                        >{category.text}</li>
                    )
                })}
            </ul>
            <div className="category-input-container">
                <TextInputField name="category" placeholder="add new list" dispatch={dispatch}/>
            </div>
        </div>
    )
}
