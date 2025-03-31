import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for handling login logic
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    
    if (userData.username === "admin" && userData.password === "1234") {
      const user = { username: userData.username };
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      return user;
    } else {
      throw new Error("Invalid username or password"); // Handle incorrect credentials
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Return error message
  }
});

// Async thunk for handling logout logic
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("user"); // Remove user data from localStorage
});

// Define initial state for authentication
const initialState = {
  isAuthenticated: !!localStorage.getItem("user"), // Check if user is already logged in
  user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user data if exists
  loading: false, // Track loading state for API calls
  error: null, // Store login error messages
};

// Create the authentication slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to clear error messages
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login request
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // Handle login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout action
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

// Export the action creator for clearing errors
export const { clearError } = authSlice.actions;

export default authSlice.reducer;
