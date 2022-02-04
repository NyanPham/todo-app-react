import React, { useState } from 'react'
import Task from './Task'
import TextInputField from './TextInputField'
import '../styles/TasksContainerStyle.css'

export default function TasksContainer({categories, dispatch}) {
    const [taskType, setTaskType] = useState('all')

    const activeCategory = categories.find(category => category.active)
    const tasks = activeCategory?.tasks //based on taskType of all - active - completed
    let chosenTasks = tasks

    if (taskType === 'active') {
        chosenTasks = tasks.filter(task => !task.complete)
    } else if (taskType === 'completed') {
        chosenTasks = tasks.filter(task => task.complete)
    } else {
        chosenTasks = tasks
    }

    const remainingTasksAmount = tasks?.filter(task => !task.complete).length

    function handleButtonClick(e) {
        if (e.target.tagName.toLowerCase() !== 'button') return
        setTaskType(e.target.name)
    }

    return (
        <div className="list">
            { activeCategory && <>
                <div className="list-header">
                    <div className="category-data">
                        <h3 className="category-name">{activeCategory && activeCategory.text}</h3>
                        {!isNaN(remainingTasksAmount) && (
                                                <p className="tasks-remaining">
                                                {remainingTasksAmount} {remainingTasksAmount === 1 ? 'task' : "tasks"} remaining  
                                            </p>
                        )}
                    </div>
                </div>
                <div className="tasks-container">
                    {chosenTasks && chosenTasks.map(task => {
                        return <Task text={task.text} id={task.id} complete={task.complete} categoryId={activeCategory.id} dispatch={dispatch} key={task.id}/>
                    })}
                </div>
                <div className="task-input-field">
                    <TextInputField name={'task'} placeholder="add new task" categoryId={activeCategory?.id} dispatch={dispatch}/>
                </div>

                <div className="btn-grid" onClick={handleButtonClick}>  
                        <button className={`all select ${taskType === 'all' ? 'chosen' : ''}`} name="all">All</button>    
                        <button className={`active select ${taskType === 'active' ? 'chosen' : ''}`} name="active">Active</button>     
                        <button className={`completed select ${taskType === 'completed' ? 'chosen' : ''}`} name="completed">Completed</button>    
                </div> 
            </>}
        </div>
    )
}