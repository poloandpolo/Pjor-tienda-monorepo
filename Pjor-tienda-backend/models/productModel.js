const db = require('../db/db.js');

class ProductModel {
  static async getAllProducts() {
    const products = await db('products')
      .select('*')
      .where({ active: true })
      .orderBy('id', 'asc');

    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const images = await db('product_images')
          .where({ product_id: product.id })
          .orderBy('sort_order', 'asc');

        const sizes = await db('product_sizes')
          .where({ product_id: product.id })
          .orderBy('id', 'asc');

        const colors = await db('product_colors')
          .where({ product_id: product.id })
          .orderBy('id', 'asc');

        return {
          id: product.id,
          text: product.name,
          description: product.description,
          price: Number(product.price),
          category: product.category,

          images: images.map((img) => img.image_url),

          sizes: sizes.map((size) => size.size),

          colors: colors.map((color) => ({
            name: color.color_name,
            image: color.image_url,
          })),
        };
      })
    );

    return formattedProducts;
  }

  static async getProductsByCategory(category) {
    const products = await this.getAllProducts();

    return products.filter(
      (product) =>
        product.category === category ||
        product.category === 'unisex'
    );
  }

  // 🔥 FALTABA ESTE
  static async getProducts(category) {
    if (category) {
      return this.getProductsByCategory(category);
    }

    return this.getAllProducts();
  }

  // 🔥 FALTABA ESTE
  static async getProductById(id) {
    const products = await this.getAllProducts();

    return products.find(
      (product) => product.id === Number(id)
    );
  }
}

module.exports = ProductModel;