const {Pool, Client } = require('pg');
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'my_database',
    password: '1234',
    port: 5432,
}
const pool = new Pool(config);

pool.on('connect', () => {});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
//await database.end()
