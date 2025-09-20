const connectMySQL = require('./connect_database');

async function CheckEmail(email) {
    const connection = await connectMySQL();
    const query = 'SELECT * FROM logins WHERE email = ?';
    const value= [email];
    const rows = await connection.execute(query, value);
    return rows;
}

module.exports = CheckEmail;