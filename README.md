# Weather App

A full-stack weather application with user authentication, featuring real-time weather data, 5-day forecasts, and a modern responsive UI with dark/light mode support.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather conditions for any city worldwide
- 📅 **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- 🔐 **User Authentication**: Secure registration and login system with session management
- 🎨 **Dark/Light Mode**: Toggle between dark and light themes with persistent preferences
- 🔍 **City Search**: Search for cities with autocomplete suggestions
- 📊 **Weather Metrics**: Display temperature, humidity, wind speed, and wave height (coastal areas)
- 🖼️ **City Images**: Beautiful city images from Unsplash API
- 📱 **Responsive Design**: Mobile-friendly interface that works on all devices
- 🌊 **Marine Data**: Wave information for coastal locations

## Tech Stack

### Frontend
- **HTML5/CSS3**: Modern semantic markup and styling
- **Vanilla JavaScript (ES6+)**: No framework dependencies, pure JavaScript
- **Day.js**: Lightweight date manipulation library

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database for user data
- **bcrypt**: Password hashing for security
- **express-session**: Session management
- **express-mysql-session**: MySQL session store

### APIs Used
- **OpenWeatherMap API**: Weather data and forecasts
- **Unsplash API**: City images
- **Open-Meteo API**: Marine/wave data

## Project Structure

```
Weather App/
├── Server/
│   ├── server.js           # Express server and API endpoints
│   ├── package.json        # Node.js dependencies
│   └── node_modules/       # Dependencies
├── scripts/
│   ├── script.js          # Main weather functionality
│   ├── auth.js            # Authentication handlers
│   ├── user-auth.js       # Authenticated user page logic
│   ├── modes.js           # Theme mode switching
│   └── meh.js             # Utility functions
├── styles/
│   ├── all.css            # Global styles
│   ├── main.css           # Main page styles
│   ├── header.css         # Header component styles
│   ├── auth.css           # Authentication page styles
│   ├── 5-days.css         # Forecast section styles
│   ├── modes.css          # Theme mode styles
│   ├── landing.css        # Landing page styles
│   └── responsivity.css   # Responsive design styles
├── images/
│   └── profil.png         # Profile images
├── index.html             # Public landing page
├── auth.html              # Login/Register page
├── user-auth.html         # Authenticated user dashboard
└── README.md              # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **pnpm** (v10.17.0 or compatible package manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Weather App"
   ```

2. **Install dependencies**
   ```bash
   cd Server
   pnpm install
   ```

3. **Set up the MySQL database**
   
   Create a database named `weatherapp`:
   ```sql
   CREATE DATABASE weatherapp;
   ```
   
   The application will automatically create the `users` table using express-mysql-session. However, you can manually create it:
   ```sql
   USE weatherapp;
   
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure the server**
   
   Edit `Server/server.js` and update the MySQL connection details:
   ```javascript
   const db = mysql.createConnection({
     user: 'root',        // Your MySQL username
     host: 'localhost',
     password: '',        // Your MySQL password
     database: 'weatherapp'
   });
   ```

5. **Get API Keys**

   You'll need API keys for:
   
   - **OpenWeatherMap**: Sign up at [openweathermap.org](https://openweathermap.org/api) and get your free API key
   - **Unsplash**: Sign up at [unsplash.com/developers](https://unsplash.com/developers) for a free API key
   
   Update the API keys in `scripts/script.js`:
   ```javascript
   const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
   const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
   ```

## Running the Application

1. **Start the MySQL service**
   - Make sure MySQL is running on your machine

2. **Start the server**
   ```bash
   cd Server
   pnpm start
   ```
   
   Or for development with auto-reload:
   ```bash
   pnpm dev
   ```

3. **Open your browser**
   
   Navigate to `http://localhost:3000`

## Usage

### Public Access
- Visit the homepage to search and view weather for any city
- View current weather conditions and 5-day forecasts
- No authentication required for basic weather viewing

### User Account
1. Click **"Sign Up"** or **"Login"** in the header
2. Register with a username, email, and password
3. After login, you'll be redirected to the authenticated dashboard
4. Access your profile settings via the profile icon
5. Toggle between dark/light mode
6. Logout when finished

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/logout` - Logout user
- `GET /api/session` - Check current session

### Pages
- `GET /` - Public landing page
- `GET /auth` - Authentication page
- `GET /user-auth.html` - Authenticated user dashboard (requires login)

## Configuration

### Session Configuration
The session is configured with:
- Cookie name: `UserId`
- Max age: 24 hours
- Storage: MySQL database

### Security Notes
⚠️ **For Production Use:**
- Change the session secret in `server.js` (currently `'369369'`)
- Set `secure: true` in cookie options when using HTTPS
- Implement environment variables for sensitive data (API keys, database credentials)
- Use `.env` file for configuration (recommended)

## Features in Detail

### Weather Display
- Current temperature with feels-like temperature
- Humidity percentage
- Wind speed (km/h)
- Wave height for coastal areas (meters)
- Weather condition descriptions
- Dynamic weather icons based on conditions

### 5-Day Forecast
- Daily temperature
- Humidity and wind speed for each day
- Weather icons matching forecast conditions
- Formatted dates with day names

### City Search
- Real-time autocomplete suggestions
- Support for major cities worldwide
- Custom city list with Moroccan cities included
- Search via input or Enter key

### Theme Management
- Light and dark mode support
- Theme preference saved in localStorage
- Smooth theme transitions
- Consistent theming across all components

## Development

### Project Architecture
- **Frontend**: Client-side JavaScript with ES6 modules
- **Backend**: RESTful API with Express.js
- **Database**: MySQL for user management and sessions
- **Styling**: Modular CSS architecture

### Code Style
- ES6+ JavaScript features
- Modular script organization
- Semantic HTML structure
- Responsive CSS with mobile-first approach

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `server.js`
   - Ensure database `weatherapp` exists

2. **API Errors**
   - Verify API keys are correct
   - Check API rate limits (free tier has limits)
   - Ensure internet connection is active

3. **Session Issues**
   - Clear browser cookies
   - Check MySQL session store is working
   - Verify session middleware is configured correctly

4. **Port Already in Use**
   - Change port in `server.js` (default: 3000)
   - Or stop the process using port 3000

## Contributing

This project is open for contributions. When contributing:
1. Follow the existing code style
2. Test your changes thoroughly
3. Update documentation as needed

## License

ISC License

## Author

4YA Products © 2025

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- City images from [Unsplash](https://unsplash.com)
- Marine data from [Open-Meteo](https://open-meteo.com)

