exports.seed = async function (knex) {
  await knex('departments').del();

  await knex('departments').insert([
    {
      id: 1,
      name: 'Hombre',
      slug: 'men'
    }
  ]);
};