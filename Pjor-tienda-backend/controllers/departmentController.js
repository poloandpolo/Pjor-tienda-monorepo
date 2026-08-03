const DepartmentModel = require('../models/departmentModel');

class DepartmentController {

  static async getMenu(req, res) {
    try {
      const { department } = req.params;

      const menu = await DepartmentModel.getMenu(department);

      return res.status(200).json(menu);

    } catch(error) {
      console.error('GET MENU ERROR:', error);

      return res.status(500).json({
        error: 'Error obteniendo menú'
      });
    }
  }

}

module.exports = DepartmentController;