import React, { useState, useEffect } from 'react'
import { isEmpty, size } from 'lodash'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './components/GlobalStyles'
import { lightTheme, darkTheme } from './components/Themes'
import shortid from 'shortid'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const [theme, setTheme] = useState("light")
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      if (result.statusResponse) {
        setTasks(result.data)
      }
      setTasks(result.data)
    })()
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("You must add a task")
      isValid = false
    }

    return isValid
  }

  const addTask = async(e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await addDocument("tasks", { name: task})
    if (!result.statusResponse){
      setError(result.error)
      return
    }

    setTasks([ ...tasks, { id: result.data.id, name: task} ])
    setTask("")
  }

  const saveTask = async(e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }
    
    const result = await updateDocument("tasks", id, { name: task })
    if (!result.statusResponse){
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = async(id) => {
    const result = await deleteDocument("tasks", id)
    if (!result.statusResponse){
      setError(result.error)
      return
    }

    const filterTasks = tasks.filter(task => task.id !== id)
    setTasks(filterTasks)
  }

/*   const completeTask = (id) => {
    const finishTask = tasks.filter(task => task.id === id)
  } */

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (  
    <ThemeProvider theme = { theme === "light" ? lightTheme : darkTheme }>
      <>
      <GlobalStyles/>
      <div className = "container mt-5">
        <title>WeTask</title>
        <button 
          className = "btn btn-outline-dark float-left"
          onClick = {themeToggler}>Switch Theme</button>
        <h1>WeTask</h1>
        <hr/>
        <div className = "row">
          <div className = "col-8"> 
            <h4 className = "text-center">Task List</h4>
            {
              size(tasks) === 0 ? (
                <li className = "list-group-item">Add some tasks to start</li>
              ) : (
              <ul className = "list-group">
                {
                  tasks.map((task) => (
                  <li className = "list-group-item" key={task.id}>
                    <span className = "lead">{task.name}</span>  
                    <button 
                      className = "btn btn-danger btn-sm float-right mx-1"
                      onClick = {() => deleteTask(task.id)}>
                      Delete
                    </button>
                    <button 
                      className = "btn btn-info btn-sm float-right mx-1"
                      onClick = {() => editTask(task)}>
                      Edit
                    </button>
                    <button 
                      className = "btn btn-success btn-sm float-right">
                      Done
                    </button>
                  </li>
                  ))
                }       
              </ul>
              )
            }
            <hr/>
          </div>
  {/*           <div className = "col-8">
              <h4 className = "text-center">Completed Task</h4>
              <ul className = "list-group">
                {
                  tasks.map((task) => (
                    <li className = "list-group-item" key={task.id}>
                      <span className = "lead">{task.name}</span>
                    <button className = "btn btn-info btn-sm float-right mx-1">Restore</button>
                    </li>
                  ))
                }
              </ul>
            </div> */}
          <div className = "col-4">
            <h4 className = "text-center">{ editMode ? "Edit task" : "Add task"}</h4>
            <form onSubmit = { editMode ? saveTask : addTask}>
              {
                error && <span className = "text-danger">{error}</span>
              }
              <input
                type = "text"
                className = "form-control mb-2"
                placeholder = "Add a new task..."
                onChange = {(text) => setTask(text.target.value)}
                value = {task}
              />
              <button
                className = { editMode ? "btn btn-success btn-block" : "btn btn-dark btn-block"}
                type = "submit">
                  { editMode ? "Save" : "Add" }
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
      </ThemeProvider>
  );
}

export default App;
