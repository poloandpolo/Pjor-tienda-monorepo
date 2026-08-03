exports.seed = async function (knex) {
  await knex('categories').del();

  await knex('categories').insert([
    {
      id: 1,
      department_id: 1,
      name: 'Gorras',
      emoji: '🧢'
    },
    {
      id: 2,
      department_id: 1,
      name: 'Prendas superiores',
      emoji: '👕'
    },
    {
      id: 3,
      department_id: 1,
      name: 'Prendas inferiores',
      emoji: '👖'
    },
    {
      id: 4,
      department_id: 1,
      name: 'Accesorios',
      emoji: '🧦'
    },
    {
      id: 5,
      department_id: 1,
      name: 'Joyería',
      emoji: '💍'
    }
  ]);
};