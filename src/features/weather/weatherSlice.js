import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API key and base URL for OpenWeatherMap API
const apikey = "4c3fc48e4c4021781f96a859478665d5";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Redux Thunk to fetch weather data asynchronously
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather", 
  async (city, { rejectWithValue }) => {
    try {
      // Fetch weather data from API
      const response = await fetch(apiurl + city + `&appid=${apikey}`);
      
      // Check if response is not OK (e.g., city not found)
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch weather data");
      }
      
      // Convert response to JSON
      const data = await response.json();
      
      // Return relevant weather information
      return {
        name: data.name, // City name
        temp: Math.round(data.main.temp), // Temperature (rounded)
        description: data.weather[0].description, // Weather description
        humidity: data.main.humidity, // Humidity percentage
        wind: data.wind.speed, // Wind speed
        icon: data.weather[0].icon, // Weather icon code
      };
    } catch (error) {
      return rejectWithValue("Network error: Unable to fetch weather data");
    }
  }
);

// Initial state for the weather slice
const initialState = {
  weather: null, // Stores fetched weather data
  loading: false, // Loading state for API request
  error: null, // Stores error messages if request fails
};

// Create Redux slice for weather data
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // Clears weather data from state
    clearWeather: (state) => {
      state.weather = null;
    },
    // Clears error message from state
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handles API request pending state
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handles successful API response
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      // Handles API request failure
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch weather data";
      });
  },
});

// Export actions to clear weather data and errors
export const { clearWeather, clearError } = weatherSlice.actions;

// Export the reducer to be used in store configuration
export default weatherSlice.reducer;
