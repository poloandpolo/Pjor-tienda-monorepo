exports.up = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    table.string('garment_type', 50).nullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('garment_type');
  });
};