const connectMySQL = require('./connect_database');
const crypto = require('crypto');
async function loginUser(username, password) {
    const connection = await connectMySQL();
    const jwt = require('jsonwebtoken');
    const password_value=crypto.createHash('sha512').update(password).digest('hex');
    const query = 'SELECT * FROM logins WHERE username = ? AND password = ?';
    const value= [username, password_value];
    const rows = await connection.execute(query, value);
    return rows;
}
module.exports = loginUser;