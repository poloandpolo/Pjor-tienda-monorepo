exports.up = function (knex) {
  return knex.schema.alterTable('payment_methods', (table) => {
    table.string('fingerprint');
    table.unique(['user_id', 'fingerprint']);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('payment_methods', (table) => {
    table.dropUnique(['user_id', 'fingerprint']);
    table.dropColumn('fingerprint');
  });
};
