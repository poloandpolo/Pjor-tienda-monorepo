exports.up = async function (knex) {
  await knex.schema.createTable('order_payment_methods', (table) => {
    table
      .integer('order_id')
      .unsigned()
      .primary()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');

    table.string('brand', 50).notNullable();
    table.string('last4', 4).notNullable();
    table.integer('exp_month').notNullable();
    table.integer('exp_year').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('order_payment_methods');
};