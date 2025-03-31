import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load todos from localStorage
const loadTodosFromStorage = () => {
  try {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return [];
  }
};

// Save todos to localStorage
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
};

// Initialize state with data from localStorage
const initialTodos = loadTodosFromStorage();

// Fetch sample todos from an API (for initial state if localStorage is empty)
export const fetchSampleTodos = createAsyncThunk(
  "todos/fetchSampleTodos",
  async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      if (!response.ok) {
        throw new Error("Failed to fetch sample todos");
      }
      const data = await response.json();
      return data.map((todo) => ({
        id: todo.id,
        text: todo.title,
        priority: "Medium", // Assigning a default priority
        completed: todo.completed,
      }));
    } catch (error) {
      throw error;
    }
  }
);

// Create the todo slice
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: initialTodos, // Load initial todos from localStorage
    status: "idle", // Track API call status
    error: null, // Store error messages
  },
  reducers: {
    // Action to add a new todo
    addTodo: (state, action) => {
      const { text, priority = "Medium" } = action.payload;
      const newTodo = {
        id: Date.now(), // Generate a unique ID
        text,
        priority,
        completed: false,
      };
      state.todos.push(newTodo);
      saveTodosToStorage(state.todos); // Save updated todos
    },
    // Action to remove a todo
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToStorage(state.todos);
    },
    // Action to update the priority of a todo
    updateTodoPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.priority = priority;
        saveTodosToStorage(state.todos);
      }
    },
    // Action to toggle the completion status of a todo
    toggleTodoComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(state.todos);
      }
    },
    // Action to clear error messages
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch request
      .addCase(fetchSampleTodos.pending, (state) => {
        state.status = "loading";
      })
      // Handle successful fetch and update state if no todos exist
      .addCase(fetchSampleTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.todos.length === 0) {
          state.todos = action.payload;
          saveTodosToStorage(state.todos);
        }
      })
      // Handle fetch failure
      .addCase(fetchSampleTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export action creators
export const { addTodo, removeTodo, updateTodoPriority, toggleTodoComplete, clearError } =
  todoSlice.actions;

export default todoSlice.reducer;
