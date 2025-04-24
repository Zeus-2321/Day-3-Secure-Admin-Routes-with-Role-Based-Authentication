const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify if the user is authenticated
const verifyToken = async (req, res, next) => {
  let idToken = '';

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    idToken = req.headers.authorization.split(' ')[1];
  }
  if(!idToken) {
    return res.status(401).json({ message: "Please login to get access" }); 
  }
  let tokenDetail;
  try {
    tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid token"})
  }

  const _id = tokenDetail.userId;
  const freshUser = await User.findOne({_id});

  if(!freshUser) {
    return res.status(400).json({ message: "User no longer exists" });
  }
  req.user = freshUser;
  next();
};
  
// Middleware to verify if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
