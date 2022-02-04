import { useState } from 'react'
import Categories from './Categories'
import TasksContainer from './TasksContainer'
import DeleteButtons from './DeleteButtons'
import useInput from '../hooks/useInput'

function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  const { state, dispatch } = useInput()

  function handleThemeChange() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return (
    <div className={`todo-app ${darkTheme? 'dark' : ''}`}>
      <div className="background" />
      <h2 className="app-title">TODO</h2>
      <button className="theme-toggle" style={{color: "white"}} onClick={handleThemeChange}>toggle</button>
      <Categories categories={state.categories} dispatch={dispatch} />
      <TasksContainer categories={state.categories}  dispatch={dispatch}/>
      <DeleteButtons categories={state.categories}  dispatch={dispatch}/>
    </div>
  );
}

export default App;
