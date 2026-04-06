// migrations/YYYYMMDDHHMMSS_create_addresses_table.js

exports.up = function(knex) {
    return knex.schema.createTable('addresses', (table) => {
      table.increments('id').primary(); // ID único para cada dirección
      table.integer('user_id').unsigned().notNullable(); // ID del usuario (relación con users)
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE'); // Relación con la tabla 'users', y eliminación en cascada
  
      // Campos de dirección
      table.string('first_name', 50).notNullable(); // Nombre del destinatario
      table.string('last_name', 50).notNullable();  // Apellido del destinatario
      table.string('address', 255).notNullable();   // Dirección
      table.string('city', 100).notNullable();      // Ciudad
      table.string('state', 100).notNullable();     // Estado
      table.string('postal_code', 20).notNullable(); // Código postal
      table.string('phone', 20).nullable();         // Teléfono (opcional, puede ser null)
  
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Fecha de creación
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Fecha de actualización
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('addresses');
  };
  