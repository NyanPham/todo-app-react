import { useReducer } from 'react';

const initialState = {
    categories: [
        {
            id: Date.now().toString(),
            text: 'JavaScript',
            active: true,
            tasks: [
                {
                    id: '121121',
                    text: 'Complete learning JavaScript concepts',
                    complete: true
                },
                {
                    id: '341322',
                    text: 'Remake the Todo App',
                    complete: false
                },
            ]
        },
        {
            id: '2',
            text: 'React',
            active: false,
            tasks: [
                {
                    id: 'daasa',
                    text: 'Dance',
                    complete: true
                },
                {
                    id: '3413266',
                    text: 'Testing',
                    complete: false
                },
            ]
        },
        {
            id: '3',
            text: 'Japanese',
            active: false,
            tasks:[]
        }
    ]
}

export const ACTIONS = {
    ADD_CATEGORY: 'add-list',
    ADD_TASK: 'add-task',
    COMPLETE_TASK: 'complete-task',
    SELECT_CATEGORY: 'select-category',
    DELETE_LIST: 'delete-list',
    CLEAR_COMPLETED: 'clear-completed'
}

function reducer(state, { type, payload }) {
    switch ( type ) {
        case ACTIONS.ADD_CATEGORY :
            return {
                categories: [...state.categories, payload.newCategory]
            }
        case ACTIONS.ADD_TASK: {
            const addedInCategory = state.categories.find(category => category.id === payload.categoryId)
            const newTasks = [...addedInCategory.tasks, payload.newTask]
            const newState = {
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
                categories: state.categories.filter(category => category.id !== payload.categoryId)
            }
        }
        case ACTIONS.CLEAR_COMPLETED: {
            return {
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
        default: 
            return state
    }
}

export default function useInput() {
    const [state, dispatch] = useReducer(reducer, initialState)


    return { state, dispatch}
}
