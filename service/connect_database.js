const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'tungo-monred2001-5326.k.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_SgO79Clwd0CP54Wz3mH',
  database: 'defaultdb',
  port: 25335,
};

async function connectMySQL() {
  return await mysql.createConnection(dbConfig);
}

module.exports = connectMySQL;
