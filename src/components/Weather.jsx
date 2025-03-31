import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, clearError } from "../features/weather/weatherSlice";

function Weather() {
  const [city, setCity] = useState(""); // State to store city input
  const dispatch = useDispatch();
  const { weather, loading, error } = useSelector((state) => state.weather); // Extracting weather state from Redux store

  // Function to fetch weather data
  const checkWeather = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeather(city)); // Dispatch action to fetch weather details
    }
  };

  return (
    <div>
      {/* Form to enter city name */}
      <form onSubmit={checkWeather}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : "Check"}
          </button>
        </div>
      </form>

      {/* Display error message if API call fails */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => dispatch(clearError())} // Clear error on close
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Display weather details if available */}
      {weather && (
        <div className="text-center p-3 border rounded bg-light">
          <h4>{weather.name}</h4>
          <div className="d-flex justify-content-center align-items-center">
            <img 
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              className="me-2"
            />
            <h2 className="mb-0">{weather.temp}°C</h2>
          </div>
          <p className="text-capitalize mb-2">{weather.description}</p>
          <div className="row mt-3">
            <div className="col-6">
              <p className="mb-0"><strong>Humidity</strong></p>
              <p>{weather.humidity}%</p>
            </div>
            <div className="col-6">
              <p className="mb-0"><strong>Wind</strong></p>
              <p>{weather.wind} km/h</p>
            </div>
          </div>
        </div>
      )}

      {/* Initial message when no data is available */}
      {!weather && !error && !loading && (
        <div className="text-center p-4">
          <p className="text-muted">Enter a city name to check the weather</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
