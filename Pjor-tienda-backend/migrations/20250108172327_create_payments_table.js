exports.up = function(knex) {
    return knex.schema.createTable('payments', table => {
      table.increments('id').primary();
      table.string('payment_intent_id').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.string('currency').notNullable();
      table.timestamps(true, true); // crea created_at y updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('payments');
  };
  