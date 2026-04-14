exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();

    table.integer('order_id').unsigned().notNullable();
    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');

    table.integer('product_id').notNullable();

    table.string('name').notNullable(); // snapshot
    table.integer('price').notNullable();
    table.integer('quantity').notNullable();

    table.string('size');
    table.string('color');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};