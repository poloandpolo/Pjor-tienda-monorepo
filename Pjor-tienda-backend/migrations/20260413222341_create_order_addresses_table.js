exports.up = function (knex) {
  return knex.schema.createTable('order_addresses', (table) => {
    table.increments('id').primary();

    table.integer('order_id').unsigned().notNullable().unique();
    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');

    table.string('first_name').notNullable();
    table.string('last_name').notNullable();

    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('postal_code').notNullable();

    table.string('phone').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_addresses');
};