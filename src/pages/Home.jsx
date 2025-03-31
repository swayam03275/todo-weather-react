import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Weather from "../components/Weather";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth); // Get the authenticated user from Redux store

  // Handle logout and redirect to login page
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Todo List with Weather</h1>
            <div className="d-flex align-items-center">
              {user && (
                <span className="me-3">
                  Welcome, <strong>{user.username}</strong>
                </span>
              )}
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="row">
        {/* Todo List Section */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Tasks</h5>
            </div>
            <div className="card-body">
              <AddTodo /> {/* Component to add new todos */}
              <TodoList /> {/* Component to display the list of todos */}
            </div>
          </div>
        </div>
        
        {/* Weather Section */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Weather</h5>
            </div>
            <div className="card-body">
              <Weather /> {/* Component to display weather information */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
