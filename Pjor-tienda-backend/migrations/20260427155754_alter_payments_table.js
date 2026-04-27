exports.up = function (knex) {
  return knex.schema.alterTable('payments', (table) => {

    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.integer('order_id')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('SET NULL');

    table.integer('payment_method_id')
      .unsigned()
      .references('id')
      .inTable('payment_methods')
      .onDelete('SET NULL');

    table.string('status').defaultTo('pending');

    table.string('stripe_charge_id');

    table.text('receipt_url');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('payments', (table) => {
    table.dropColumn('user_id');
    table.dropColumn('order_id');
    table.dropColumn('payment_method_id');
    table.dropColumn('status');
    table.dropColumn('stripe_charge_id');
    table.dropColumn('receipt_url');
  });
};