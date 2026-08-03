exports.up = async function (knex) {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();

    table
      .integer('department_id')
      .unsigned()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');

    table.string('name', 100).notNullable();
    table.string('emoji', 10);

    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('categories');
};