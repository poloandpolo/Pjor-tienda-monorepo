const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 🔥 MANEJO EXPLÍCITO DE PREFLIGHT
router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(200);
});

// POST /users
router.post('/', userController.createUser);

// PUT /users/password
router.put('/password', userController.updatePassword);

module.exports = router;