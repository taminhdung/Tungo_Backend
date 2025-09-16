const connectMySQL = require('./connect_database');

async function createTable() {
    const connection = await connectMySQL(); // gọi hàm để tạo connection

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS logins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            status BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    await connection.execute(createTableQuery);
    await connection.end(); // đóng connection khi xong
}
module.exports = createTable;