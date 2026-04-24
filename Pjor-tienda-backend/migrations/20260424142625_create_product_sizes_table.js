exports.up = function (knex) {
  return knex.schema.createTable('product_sizes', (table) => {
    table.increments('id').primary();

    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table.string('size').notNullable(); // s,m,l,xl,xxl

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('product_sizes');
};