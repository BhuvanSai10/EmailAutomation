const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { email, password, passkey } = req.body;
    if (!email || !password || !passkey) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, passkey });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Signup failed', error: error.message });
    }
  }
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key'
    res.json({ token, message: "Signin Successful" });
  } catch (error) {
    res.status(500).json({ message: 'Signin failed', error: error.message });
  }
};

module.exports = { signup, signin };