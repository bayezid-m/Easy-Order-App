const mongoose = require('mongoose');
const User = require('../model/userModel');
const { decode } = require('jsonwebtoken');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const authenticateToken = async (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) return res.status(401).json({ message: 'Access denied. User is not logged in.' });
 
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_secret_token);
      const userEmail = decodedToken.email
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(403).json({ message: 'Invalid token. User not found.' });
      }
  
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
  };
  
  module.exports = { authenticateToken };