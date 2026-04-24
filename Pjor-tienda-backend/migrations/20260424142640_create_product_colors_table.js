exports.up = function (knex) {
  return knex.schema.createTable('product_colors', (table) => {
    table.increments('id').primary();

    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table.string('color_name').notNullable(); // black, white

    table.text('image_url'); // opcional swatch o imagen color

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('product_colors');
};