exports.up = function (knex) {
  return knex.schema.alterTable('orders', (table) => {
    table.integer('shipping_address_id').unsigned();
    table.foreign('shipping_address_id')
      .references('id')
      .inTable('addresses')
      .onDelete('SET NULL');

    table.integer('payment_method_id').unsigned();
    table.foreign('payment_method_id')
      .references('id')
      .inTable('payment_methods')
      .onDelete('SET NULL');

    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.timestamp('paid_at');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('orders', (table) => {
    table.dropColumn('shipping_address_id');
    table.dropColumn('payment_method_id');
    table.dropColumn('updated_at');
    table.dropColumn('paid_at');
  });
};