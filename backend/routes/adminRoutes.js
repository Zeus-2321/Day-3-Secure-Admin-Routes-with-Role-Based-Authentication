const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin protected route
router.get('/', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Admin Panel',
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

module.exports = router;
