const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./cofig/db');
const authRouter = require('./routes/auth.route');
const ordersRouter = require('./routes/orders.route');
const app = express();
app.use(cors(
  {
    origin: "http://192.168.0.120:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],  
    credentials: true,
  }
));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/orders", ordersRouter);

app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Start server
app.listen(8080, () => {
  try {
    connectDB();
    console.log('Server running on http://192.168.0.120:8080');
  } catch (error) {
    console.error('Error starting server:', error);
  }
});







// // SIGNUP
// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(req.body);
//   if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

//   // Check if user exists
//   if (users.some(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Save user
//   users.push({ name, email, password: hashedPassword });
//   res.json({ message: 'Registered successfully' });
// });

// // LOGIN
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   const user = users.find(u => u.email === email);
//   if (!user) return res.status(401).json({ error: 'Invalid credentials' });
 
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ error: 'Invalid credentials' });

//   res.json({ message: 'Login successful', name: user.name, email: user.email });
// });