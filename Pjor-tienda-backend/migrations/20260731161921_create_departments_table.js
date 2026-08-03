exports.up = async function (knex) {
  await knex.schema.createTable('departments', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 50).notNullable().unique();
    table.boolean('active').defaultTo(true);

    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('departments');
};