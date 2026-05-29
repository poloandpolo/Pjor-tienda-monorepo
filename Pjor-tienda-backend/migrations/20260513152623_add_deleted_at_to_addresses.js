exports.up = async function(knex) {

    await knex.schema.alterTable('addresses', (table) => {

        table.timestamp('deleted_at').nullable();

    });

};

exports.down = async function(knex) {

    await knex.schema.alterTable('addresses', (table) => {

        table.dropColumn('deleted_at');

    });

};