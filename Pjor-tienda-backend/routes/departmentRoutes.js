const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departmentController');


router.get(
  '/:department/menu',
  DepartmentController.getMenu
);


module.exports = router;