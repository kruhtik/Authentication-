const mongoose = require("mongoose");
const User = require("../models/authModel");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({email : email});
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    
      res.json({ message: 'Login successful', name: user.name, email: user.email });
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registered successfully' });
};
module.exports = { login, signup };