const knex = require('knex');
const knexConfig = require('../knexfile');

const env = process.env.NODE_ENV || 'development';

const db = knex({
  ...knexConfig[env],
  pool: {
    min: 0,
    max: 5,
    acquireTimeoutMillis: 30000,
  },
});

console.log('ENV:', process.env.NODE_ENV);

db.raw('SELECT 1')
  .then(() => console.log('✅ DB conectada'))
  .catch(err => console.error('💥 DB ERROR:', err));

module.exports = db;