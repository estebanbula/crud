import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Task empty")
      return
    }
    
    const newTask = {
      id: shortid.generate(),
      name: task
    } 

    setTasks([ ...tasks, newTask ])
    setTask("")
  }

  const deleteTask = (id) => {
    const filterTasks = tasks.filter(task => task.id !== id)
    setTasks(filterTasks)
  }

  const completeTask = (id) => {
    const finishTask = tasks.filter(task => task.id == id)
  }

  return (  
    <div className = "container mt-5">
      <h1>WeTask</h1>
      <hr/>
      <div className = "row">
        <div className = "col-8"> 
          <h4 className = "text-center">Task List</h4>
          {
            size(tasks) == 0 ? (
              <h5 className = "text-center">Add some tasks to start</h5>
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
                    className = "btn btn-info btn-sm float-right mx-1">
                    Edit
                  </button>
                  <button 
                    className = "btn btn-success btn-sm float-right"
                    onClick = {() => completeTask(task.id)}>
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
          <h4 className = "text-center">Edit Form</h4>
          <form onSubmit = {addTask}>
            <input
              type = "text"
              className = "form-control mb-2"
              placeholder = "Add a new task..."
              onChange = {(text) => setTask(text.target.value)}
              value = {task}
            />
            <button
              className = "btn btn-dark btn-block"
              type = "submit">
                Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
