const express = require('express');
const path = require('path');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Register new user
// @access  Public
router.get('/', (req, res) => {
  res.send('');
});



module.exports = router;