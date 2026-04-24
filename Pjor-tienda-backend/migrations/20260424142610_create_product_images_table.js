exports.up = function (knex) {
  return knex.schema.createTable('product_images', (table) => {
    table.increments('id').primary();

    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table.text('image_url').notNullable();

    table.integer('sort_order').defaultTo(0);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('product_images');
};