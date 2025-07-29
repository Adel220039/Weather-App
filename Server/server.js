const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');





const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'weatherapp'
});

const sessionStore = new MySQLStore({}, db)

app.use(express.json());

app.use(session({
  secret: '369369',
  store: sessionStore, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}))

app.use(express.static(path.join(__dirname, '..')));



// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

sessionStore.onReady().then(()=>{
  console.log('MySQLStore ready')
}).catch(err=>{
  console.log(`Error: ${err}.`)
})

app.get('/', (req, res) => {
  
  req.session.isAuth = true;

  
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../auth.html'));
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

      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: 'Session error' });
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

// Session check endpoint
app.get('/auth/session', (req, res) => {
  res.json({
    isAuth: req.session.isAuth,
    sessionId: req.sessionID
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
