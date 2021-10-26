const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  database: 'sdc',
  host: '172.31.11.176',
  port: 5432,
});

module.exports = pool;
