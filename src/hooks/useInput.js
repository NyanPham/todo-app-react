import { useReducer, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'

const LOCAL_STORAGE_TODO_APP_STATE_KEY = 'nyan-todoapp.state_key'

export const ACTIONS = {
    ADD_CATEGORY: 'add-list',
    ADD_TASK: 'add-task',
    COMPLETE_TASK: 'complete-task',
    SELECT_CATEGORY: 'select-category',
    DELETE_LIST: 'delete-list',
    CLEAR_COMPLETED: 'clear-completed',
    UPDATE_ORDER: 'update-order',
    // CHANGE_THEME: 'change-theme'
}

function reducer(state, { type, payload }) {
    switch ( type ) {
        case ACTIONS.ADD_CATEGORY : {
            return {
                categories: [...state.categories, payload.newCategory]
            }
        }
            
        case ACTIONS.ADD_TASK: {
            const addedInCategory = state.categories.find(category => category.id === payload.categoryId)
            const newTasks = [...addedInCategory.tasks, payload.newTask]
            const newState = {
                    ...state,
                    categories: state.categories.map(category => {
                    if (category.id === payload.categoryId) {
                        return {
                            ...addedInCategory,
                            tasks: newTasks
                        }
                    } else {
                        return category
                    }
                 })
            }
            return newState
        }
            
        case ACTIONS.COMPLETE_TASK: {
            const inCategory = state.categories.find(category => category.id === payload.categoryId)
            const completeTask = inCategory.tasks.find(task => task.id === payload.taskId)
            completeTask.complete = !payload.complete
            const newTasks = inCategory.tasks.map(task => {
                    if (task.id === payload.taskId) {
                        return completeTask
                    } else {
                        return task
                    }
                })
                const newState = {
                    ...state,
                    categories: state.categories.map(category => {
                    if (category.id === payload.categoryId) {
                        return {
                            ...inCategory,
                            tasks: newTasks
                        }
                    } else {
                        return category
                    }
                })
            }
            return newState
        }

        case ACTIONS.SELECT_CATEGORY: {
            const newState = {
                ...state,
                categories: state.categories.map(category => {
                    if (category.id === payload.categoryId) {
                        return {
                            ...category,
                            active: true
                        }
                    } else {
                        return {
                            ...category,
                            active: false
                        }
                    }
                })
            }
            return newState
        }
        
        case ACTIONS.DELETE_LIST: {
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== payload.categoryId)
            }
        }

        case ACTIONS.CLEAR_COMPLETED: {
            return {
                ...state,
                categories: state.categories.map(category => {
                    if (category.id === payload.categoryId) {
                        return {
                            ...category,
                            tasks: category.tasks.filter(task => !task.complete)
                        }
                    } else {
                        return category
                    }
                })
            }
        }

        case ACTIONS.UPDATE_ORDER: {
            const orderedIds = Array.from(payload.orderedTasks).map(task => {
                return task.querySelector('input').id
            })
            const oldCategory = state.categories.find(category => category.id === payload.categoryId)
            const oldTasks = oldCategory.tasks
            const newOrderedTasks = orderedIds.map(id => {
                const correspondingTask = oldTasks.find(task => task.id === id)
                return correspondingTask
            })
            const newState = {
                ...state,
                categories: state.categories.map(category => {
                    if (category.id === payload.categoryId) {
                        return {
                            ...category,
                            tasks: newOrderedTasks
                        }
                    } else {
                        return category
                    }
                })
            }
            return newState
        }

        // case ACTIONS.CHANGE_THEME: {
        //     return {
        //         ...state,
        //         darkTheme: !state.darkTheme
        //     }
        // }

        default: 
            return state
    }
}

export default function useInput() {
    const { state: initialState, setState: setInitialState  } = useLocalStorage(LOCAL_STORAGE_TODO_APP_STATE_KEY, {
        darkTheme: false,
        categories: []
    })

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        setInitialState(state)
    }, [state])

    return { state, dispatch}
}
