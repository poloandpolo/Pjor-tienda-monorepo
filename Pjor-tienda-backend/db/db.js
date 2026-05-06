const knex = require('knex');
const knexConfig = require('../knexfile');

const env = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[env]);

console.log('🔥 USING ENV:', env);
console.log('🔥 DATABASE_URL:', process.env.DATABASE_URL);

module.exports = db;