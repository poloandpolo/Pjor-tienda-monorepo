exports.up = async function (knex) {
  await knex.schema.alterTable('products', (table) => {

    table
      .integer('department_id')
      .unsigned()
      .references('id')
      .inTable('departments');

    table
      .integer('garment_type_id')
      .unsigned()
      .references('id')
      .inTable('garment_types');

    table.dropColumn('category');
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('products', (table) => {

    table.string('category');

    table.dropForeign(['department_id']);
    table.dropForeign(['garment_type_id']);

    table.dropColumn('department_id');
    table.dropColumn('garment_type_id');
  });
};