const connectMySQL = require('./connect_database');
const crypto = require('crypto');
async function registerUser(username, password, email) {
    const connection = await connectMySQL();
    const password_value=crypto.createHash('sha512').update(password).digest('hex');
    const query = 'INSERT INTO logins (username, password, email) VALUES (?, ?, ?)';
    const value= [username, password_value, email];
    return await connection.execute(query, value);
}
module.exports = registerUser;