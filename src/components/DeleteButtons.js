import React from 'react';
import '../styles/DeleteButtonsStyle.css'
import { ACTIONS } from '../hooks/useInput'

export default function DeleteButtons({categories, dispatch}) {
   const activeCategory = categories?.find(category => category.active)
   function deleteList() {
      dispatch({
         type: ACTIONS.DELETE_LIST,
         payload: {
            categoryId: activeCategory.id
         }
      })
   }
   function clearCompleted() {
      dispatch({
         type: ACTIONS.CLEAR_COMPLETED,
         payload: {
            categoryId: activeCategory.id
         }
      })
   }

   return (
      <div className="delete-btns">
         <button className="delete-list delete" onClick={deleteList}>Delete list</button>
         <button className="clear-completed delete" onClick={clearCompleted}>Clear completed</button>
      </div>
   )
}
