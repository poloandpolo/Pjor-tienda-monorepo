const db = require('../db/db');

class DepartmentModel {

  static async getMenu(slug) {

    const categories = await db('department_categories')
      .join(
        'departments',
        'department_categories.department_id',
        'departments.id'
      )
      .join(
        'categories',
        'department_categories.category_id',
        'categories.id'
      )
      .where('departments.slug', slug)
      .select(
        'categories.id',
        'categories.name',
        'department_categories.emoji',
        'department_categories.display_order'
      )
      .orderBy('department_categories.display_order');


    return Promise.all(
      categories.map(async(category)=>{

        const items = await db('garment_types')
          .where({
            category_id: category.id
          })
          .select('name')
          .orderBy('id');


        return {
          title: category.name,
          emoji: category.emoji,
          items: items.map(item=>item.name)
        };

      })
    );
  }

}

module.exports = DepartmentModel;