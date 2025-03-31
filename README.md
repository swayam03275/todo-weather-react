# Todo App with Weather Integration

A feature-rich Todo List application integrated with a Weather API, built using **React, Redux Toolkit, and Bootstrap**.

## 📌 Features Implemented

### ✅ Todo Management
- Add tasks with different priority levels (Low, Medium, High).
- Remove completed or unwanted tasks.
- Mark tasks as completed.
- Persist todos using `localStorage`.

### 🌦 Weather Information
- Fetch real-time weather updates using OpenWeatherMap API.
- Display temperature, humidity, wind speed, and weather conditions.
- Show corresponding weather icons for better visualization.

### 🔐 Authentication
- Simple login/logout system (mock authentication for demonstration).
- Redirect to home page after successful login.

### ⚡ State Management
- Uses **Redux Toolkit** for efficient state management.
- Stores todos, weather data, and authentication status globally.

## 🚀 Setup and Running Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/swayam03275/todo-weather-react.git
cd todo-weather-react

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your OpenWeather API key:
REACT_APP_WEATHER_API_KEY=your_api_key_here

4️⃣ Start the Application
npm run dev

5️⃣ Login Credentials
Use the following mock credentials to log in:
Username: admin
Password: 1234



📸 Screenshots

Login Page
![Login Page](screenshots/login.png)

Home Page
![Home Page](screenshots/home.png)


Todo List
![Todo List](screenshots/todo.png)

Weather Information
![Weather Info](screenshots/weather.png)

📜 Tech Stack
Frontend: React, Redux Toolkit, Bootstrap

State Management: Redux Toolkit

Weather API: OpenWeatherMap API

🛠 Future Enhancements
✅ User authentication with Firebase/Auth0.

✅ Drag-and-drop task reordering.

✅ Dark mode support.

✅ PWA (Progressive Web App) support.

💡 Contributing
Feel free to fork this project and submit pull requests!

Made with ❤️ by swayam03275




