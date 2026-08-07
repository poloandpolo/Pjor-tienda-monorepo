exports.up = async function (knex) {
  await knex.schema.alterTable('product_sizes', (table) => {
    table.integer('stock').notNullable().defaultTo(0);
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('product_sizes', (table) => {
    table.dropColumn('stock');
  });
};