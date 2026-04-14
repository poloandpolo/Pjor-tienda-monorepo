exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    table.string('status').notNullable().defaultTo('pending'); 
    // pending | paid | failed | shipped | delivered

    table.integer('subtotal').notNullable();
    table.integer('shipping_cost').defaultTo(0);
    table.integer('taxes').defaultTo(0);
    table.integer('total_amount').notNullable();

    table.string('currency').defaultTo('mxn');

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};