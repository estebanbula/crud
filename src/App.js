import React from 'react'

function App() {
  return (  
    <div className = 'container mt-5'>
      <h1>WeTask</h1>
      <hr/>
      <div className = 'row'>
        <div className = 'col-8'> 
          <h4 className = "text-center">Task List</h4>
          <ul className = "list-group">
            <li className = "list-group-item">
              <span className = "lead">Task name</span>  
              <button className = "btn btn-danger btn-sm float-right mx-2">Delete</button>
              <button className = "btn btn-info btn-sm float-right mx-2">Edit</button>
              <button className = "btn btn-success btn-sm float-right">Success</button>
            </li>
          </ul>
        </div>
        <div className = 'col-4'>
          <h4 className = "text-center">Edit Form</h4>
          <form>
            <input
              type = "text"
              className = "form-control mb-2"
              placeholder = "Add a new task..."
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
