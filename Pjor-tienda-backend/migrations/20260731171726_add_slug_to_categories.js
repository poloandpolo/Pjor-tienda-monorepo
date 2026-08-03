exports.up = async function (knex) {
  await knex.schema.alterTable('categories', (table) => {
    table.string('slug', 100).unique();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('categories', (table) => {
    table.dropColumn('slug');
  });
};