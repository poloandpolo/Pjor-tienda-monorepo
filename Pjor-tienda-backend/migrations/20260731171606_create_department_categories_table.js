exports.up = async function (knex) {
  await knex.schema.createTable('department_categories', (table) => {
    table.increments('id').primary();

    table
      .integer('department_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');

    table
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');

    table.string('emoji', 10).notNullable();

    table.integer('display_order').defaultTo(0);

    table.timestamps(true, true);

    table.unique(['department_id', 'category_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('department_categories');
};