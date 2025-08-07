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







 