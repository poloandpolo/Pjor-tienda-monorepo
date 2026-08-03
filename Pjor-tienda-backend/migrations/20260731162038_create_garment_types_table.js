exports.up = async function (knex) {
  await knex.schema.createTable('garment_types', (table) => {
    table.increments('id').primary();

    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');

    table.string('name', 100).notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('garment_types');
};