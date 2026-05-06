const knex = require('knex');
const knexConfig = require('../knexfile');

const env = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[env]);

console.log('ENV:', process.env.NODE_ENV);
console.log('DB HOST:', process.env.DB_HOST);

module.exports = db;