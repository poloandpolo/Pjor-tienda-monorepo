exports.seed = async function (knex) {
  await knex('garment_types').del();

  await knex('garment_types').insert([
    // Gorras
    { category_id: 1, name: 'Beisbol' },
    { category_id: 1, name: 'Snapback' },
    { category_id: 1, name: '5 Paneles' },

    // Prendas superiores
    { category_id: 2, name: 'Playeras' },
    { category_id: 2, name: 'Polos' },
    { category_id: 2, name: 'Camisas' },
    { category_id: 2, name: 'Hoodies' },
    { category_id: 2, name: 'Chamarras' },

    // Prendas inferiores
    { category_id: 3, name: 'Jogger' },
    { category_id: 3, name: 'Jeans' },

    // Accesorios
    { category_id: 4, name: 'Cinturones' },
    { category_id: 4, name: 'Calcetas' },

    // Joyería
    { category_id: 5, name: 'Collares' },
    { category_id: 5, name: 'Pulseras' },
    { category_id: 5, name: 'Brazaletes' },
    { category_id: 5, name: 'Cadenas' },
    { category_id: 5, name: 'Dijes' }
  ]);
};