exports.up = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('garment_type');
    table.dropColumn('department_id');
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('products', (table) => {
    table.string('garment_type');

    table
      .integer('department_id')
      .unsigned()
      .references('id')
      .inTable('departments');
  });
};