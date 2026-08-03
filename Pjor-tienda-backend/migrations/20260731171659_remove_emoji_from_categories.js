exports.up = async function (knex) {
  await knex.schema.alterTable('categories', (table) => {
    table.dropColumn('emoji');
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('categories', (table) => {
    table.string('emoji', 10);
  });
};