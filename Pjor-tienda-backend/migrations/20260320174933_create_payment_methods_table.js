exports.up = function (knex) {
  return knex.schema.createTable('payment_methods', (table) => {
    table.increments('id').primary();

    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    table.string('stripe_payment_method_id').notNullable();
    table.string('stripe_customer_id').notNullable();

    table.string('brand');
    table.string('last4', 4);
    table.integer('exp_month');
    table.integer('exp_year');

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('payment_methods');
};