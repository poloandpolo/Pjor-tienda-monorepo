const ProductsModel = require('../models/productModel');

class ProductsController {

  // GET /api/products
  static async getProducts(req, res) {
    try {
      const { department } = req.query;

      const products = await ProductsModel.getProducts(department);

      return res.status(200).json(products);

    } catch (error) {
      console.error('GET PRODUCTS ERROR:', error);

      return res.status(500).json({
        error: 'Error al obtener productos',
      });
    }
  }


  // GET /api/products/:id
  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductsModel.getProductById(id);

      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
        });
      }

      return res.status(200).json(product);

    } catch (error) {
      console.error('GET PRODUCT BY ID ERROR:', error);

      return res.status(500).json({
        error: 'Error al obtener producto',
      });
    }
  }
}

module.exports = ProductsController;