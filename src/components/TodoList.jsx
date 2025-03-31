import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTodos, removeTodo, updateTodoPriority, toggleTodoComplete } from "../features/todo/todoSlice";

function TodoList() {
  // Extracting todos, status, and error from Redux store
  const { todos, status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Fetch sample todos when component mounts if status is idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSampleTodos());
    }
  }, [status, dispatch]);

  // Function to delete a todo
  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  // Function to update priority of a todo
  const handlePriorityChange = (id, priority) => {
    dispatch(updateTodoPriority({ id, priority }));
  };

  // Function to mark a todo as completed/incomplete
  const handleToggleComplete = (id) => {
    dispatch(toggleTodoComplete(id));
  };

  // Function to determine the color of priority badge
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger"; // Red for high priority
      case "Medium":
        return "bg-warning text-dark"; // Yellow for medium priority
      case "Low":
        return "bg-info text-dark"; // Blue for low priority
      default:
        return "bg-secondary"; // Gray for unknown priority
    }
  };

  // Display loading spinner if data is being fetched
  if (status === "loading") {
    return <div className="d-flex justify-content-center my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  // Display error message if fetching fails
  if (status === "failed") {
    return <div className="alert alert-danger" role="alert">
      Error: {error}
    </div>;
  }

  return (
    <div>
      {/* Show message if no tasks exist */}
      {todos.length === 0 ? (
        <div className="text-center p-4 border rounded bg-light">
          <p className="mb-0">No tasks added yet. Add your first task above!</p>
        </div>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                todo.completed ? "bg-light" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                {/* Checkbox to mark task as complete */}
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  id={`todo-${todo.id}`}
                />
                <div>
                  {/* Display task text with strike-through if completed */}
                  <label 
                    className={`form-check-label ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}
                    htmlFor={`todo-${todo.id}`}
                  >
                    {todo.text}
                  </label>
                  <div className="mt-1">
                    {/* Priority badge with appropriate color */}
                    <span className={`badge ${getPriorityBadgeClass(todo.priority)}`}>
                      {todo.priority}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="d-flex">
                {/* Dropdown to change task priority */}
                <select
                  className="form-select form-select-sm me-2"
                  value={todo.priority}
                  onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                  style={{ width: "120px" }}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                {/* Button to delete task */}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
