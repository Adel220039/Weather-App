const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');


const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'weatherapp'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }else{
    console.log('Connected to MySQL database');
 }
});

const sessionStore = new MySQLStore({
  user:'root',
  host:'localhost',
  password:'',
  database:'weatherapp'
})

sessionStore.onReady().then(()=>{
  console.log('MySQLStore ready')
}).catch(err=>{
  console.log(`Error: ${err}.`)
})


app.use(express.json());

app.use(session({
  name:'UserId',
  secret: '369369',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))


app.get('/', (req, res) => {
  if (req.session.isAuth) {
    return res.redirect('/user-auth.html');
  }
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.join(__dirname, '..')));

app.get('/auth', (req, res) => { 
  if (req.session.isAuth) {
    return res.redirect('/user-auth.html');
  }
  res.sendFile(path.join(__dirname, '../auth.html'));
});

app.get('/user-auth.html', (req, res) => { 
  // Check if user is authenticated
  if (!req.session.isAuth) {
    console.log('Unauthorized access attempt to user-auth.html');
    return res.redirect('/auth');
  }
  
  console.log('Authenticated user accessing user-auth.html');
  res.sendFile(path.join(__dirname, '../user-auth.html'));
});

// Session check endpoint
app.get('/api/session', (req, res) => {
  res.json({
    sessionID: req.sessionID,
    sessionData: req.session,
    isAuthenticated: req.session.isAuth || false
  });
});

// Registration endpoint
app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length > 0) {
        return res.status(409).json({ error: 'Email already registered.' });
      }
      
      // Hash password and insert user
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ error: 'Registration failed' });
          }
          
          console.log('User registered successfully');
          res.status(201).json({ message: 'Registration successful' });
        }
      );
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    // Find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const user = results[0];
      
      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Password is incorrect' });
      }

      // Set session data
      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      req.session.isAuth = true;

      // Manually save session
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: 'Login failed - session error' });
        }
        
        console.log('User logged in successfully');
        res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout endpoint
app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('UserId');
    res.json({ message: 'Logged out successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
