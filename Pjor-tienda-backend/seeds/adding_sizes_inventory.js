exports.seed = async function (knex) {
  const randomStock = () => Math.floor(Math.random() * 21); // 0 - 20

  const sizes = await knex('product_sizes').select('id');

  for (const size of sizes) {
    await knex('product_sizes')
      .where({ id: size.id })
      .update({
        stock: randomStock(),
        updated_at: knex.fn.now(),
      });
  }
};