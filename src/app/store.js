import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todo/todoSlice";
import weatherReducer from "../features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,    // Handles authentication state
    todos: todoReducer,   // Manages to-do list operations
    weather: weatherReducer, // Stores weather data from API
  },
});

// This store is used globally to manage state in the app
