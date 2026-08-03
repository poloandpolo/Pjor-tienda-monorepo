const db = require('../db/db.js');

class ProductModel {
  static async formatProduct(product) {
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
      categoryId: product.category_id,

      garmentType: product.garment_type,
      garmentTypeId: product.garment_type_id,

      images: images.map((img) => img.image_url),

      sizes: sizes.map((size) => size.size),

      colors: colors.map((color) => ({
        name: color.color_name,
        image: color.image_url,
      })),
    };
  }

  static async getAllProducts() {
    const products = await db('products')
      .leftJoin(
        'garment_types',
        'products.garment_type_id',
        'garment_types.id'
      )
      .leftJoin(
        'categories',
        'garment_types.category_id',
        'categories.id'
      )
      .select(
        'products.*',
        'garment_types.id as garment_type_id',
        'garment_types.name as garment_type',
        'categories.id as category_id',
        'categories.name as category'
      )
      .where('products.active', true)
      .orderBy('products.id', 'asc');

    return Promise.all(products.map((product) => this.formatProduct(product)));
  }

  static async getProductsByDepartment(department) {
    const products = await db('products')
      .join(
        'product_departments',
        'products.id',
        'product_departments.product_id'
      )
      .join(
        'departments',
        'product_departments.department_id',
        'departments.id'
      )
      .leftJoin(
        'garment_types',
        'products.garment_type_id',
        'garment_types.id'
      )
      .leftJoin(
        'categories',
        'garment_types.category_id',
        'categories.id'
      )
      .select(
        'products.*',
        'garment_types.id as garment_type_id',
        'garment_types.name as garment_type',
        'categories.id as category_id',
        'categories.name as category'
      )
      .where('products.active', true)
      .where('departments.slug', department)
      .orderBy('products.id', 'asc');

    return Promise.all(products.map((product) => this.formatProduct(product)));
  }

  static async getProducts(department) {
    if (department) {
      return this.getProductsByDepartment(department);
    }

    return this.getAllProducts();
  }

  static async getProductById(id) {
    const product = await db('products')
      .leftJoin(
        'garment_types',
        'products.garment_type_id',
        'garment_types.id'
      )
      .leftJoin(
        'categories',
        'garment_types.category_id',
        'categories.id'
      )
      .select(
        'products.*',
        'garment_types.id as garment_type_id',
        'garment_types.name as garment_type',
        'categories.id as category_id',
        'categories.name as category'
      )
      .where('products.id', id)
      .where('products.active', true)
      .first();

    if (!product) {
      return null;
    }

    return this.formatProduct(product);
  }
}

module.exports = ProductModel;