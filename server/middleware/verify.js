require('dotenv').config();
const jwt = require('jsonwebtoken');

// Verify Middleware

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
  
    if(!token) {
      res.status(401).json({error: 'User not authenticated!'});
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if(err) return res.sendStatus(403);
      req.payload = payload.role;
      next();
    });
  }

  module.exports = { verify };