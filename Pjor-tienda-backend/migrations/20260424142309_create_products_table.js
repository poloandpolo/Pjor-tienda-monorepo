exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable(); // nombre producto
    table.text('description'); // opcional

    table.decimal('price', 10, 2).notNullable();

    table
      .enu('category', ['men', 'women', 'unisex'], {
        useNative: true,
        enumName: 'product_category_enum',
      })
      .notNullable()
      .defaultTo('unisex');

    table.boolean('active').defaultTo(true);

    table.timestamps(true, true); // created_at updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};