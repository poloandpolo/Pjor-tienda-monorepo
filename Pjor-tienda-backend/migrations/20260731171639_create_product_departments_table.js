exports.up = async function (knex) {
  await knex.schema.createTable('product_departments', (table) => {

    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table
      .integer('department_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');

    table.primary(['product_id', 'department_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('product_departments');
};