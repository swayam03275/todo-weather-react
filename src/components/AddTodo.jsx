import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  // State to store task input
  const [input, setInput] = useState("");

  // State to store selected priority (default is "Medium")
  const [priority, setPriority] = useState("Medium");

  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle form submission
  const addTodoHandler = (e) => {
    e.preventDefault(); // Prevents page refresh

    if (!input.trim()) return; // Avoid adding empty tasks

    // Dispatch action to add the new task to Redux store
    dispatch(addTodo({ text: input, priority }));

    // Reset input and priority fields after adding task
    setInput("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={addTodoHandler} className="mb-4">
      <div className="row g-2">
        <div className="col-12">
          {/* Input field for entering task */}
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </div>

        <div className="col-sm-8 col-md-9">
          {/* Dropdown to select task priority */}
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div className="col-sm-4 col-md-3">
          {/* Button to submit and add task */}
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddTodo;
