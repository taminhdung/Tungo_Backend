const express = require('express');
const fs = require('fs');
const https = require('https');//import https
const jwt = require('jsonwebtoken'); 
const connectMySQL = require('./service/connect_database'); // import hàm connect
const createTable = require('./service/create_table'); // import hàm tạo bảng
const registerUser = require('./service/register'); // import hàm đăng ký user
const loginUser = require('./service/login'); // import hàm đăng nhập user
const axios = require('axios');

const app = express();// khởi tạo Express app

app.use(express.json()); // Cho phép đọc JSON từ body

const options = {//tạo chứng chỉ SSL
  key: fs.readFileSync('./SSL/server.key'),
  cert: fs.readFileSync('./SSL/server.cert')
};

const PORT = process.env.PORT || 9999; // Render sẽ cung cấp PORT
const HOST = "0.0.0.0"; // Render không cần đổi gì, chỉ để listen all

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server chạy tại http://${HOST}:${PORT}`);

  // Tạo hàm async để gọi các hàm async và bắt lỗi
  async function init() {
    try {
      await connectMySQL();
      console.log('✅ Kết nối database thành công');
    } catch (err) {
      console.error('❌ Kết nối database thất bại:', err.message);
    }

    try {
      await createTable();
      console.log('✅ Tạo bảng thành công');
    } catch (err) {
      console.error('❌ Tạo bảng thất bại:', err.message);
    }
  }

  init(); // gọi hàm async
});

app.get('/ctde', async (_req, res) => {// route kiểm tra kết nối database
    try {
        const connect = await connectMySQL();

        res.status(200).json({
            message: 'Kết nối thành công!',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Kết nối thất bại!',
            error: err.message,
        });
    }
});

app.post('/cete', async (_req, res) => {// route tạo bảng
    try {
        await createTable(); // gọi hàm tạo bảng

        res.status(200).json({
            message: 'Tạo bảng thành công!',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Tạo bảng thất bại!',
            error: err.message,
        });
    }
});

app.post('/rr', async (req, res) => {// route đăng ký user
    try {
        const { username, password, email } = req.body;
        await registerUser(username,password,email); // gọi hàm tạo bảng

        res.status(200).json({
            message: 'Thêm tài khoản thành công',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Thêm tài khoản thât bại',
            error: err.message,
        });
    }
});

app.get('/ln', async (req, res) => {// route đăng nhập user
    const { username, password } = req.body;
    const rows = await loginUser(username, password);
    const data_value=rows[0][0];
    const Secure_key = `${Math.floor(Math.random() * 9007199254740991)}`;
    const Refresh_key = `${Math.floor(Math.random() * -9007199254740991)}`;
    const token_access=jwt.sign({id: data_value.id,username: data_value.username},Secure_key,{ expiresIn: "15m" });
    const refresh_access=jwt.sign({id: data_value.id,username: data_value.username},Refresh_key,{ expiresIn: "7d" });
    if (rows.length > 0) {
        res.status(200).json({
            message: 'Đăng nhập thành công',
            id: data_value.id,
            username: data_value.username,
            token_access: token_access,
            refresh_access: refresh_access,
        });
    } else {
        res.status(401).json({
            message: 'Đăng nhập thất bại, sai tên đăng nhập hoặc mật khẩu',
        });
    }
});

app.get('/lt', async (req, res) => {// route đăng xuất user
    const {id, username} = req.body;
    const Secure_key = `${Math.floor(Math.random() * 9007199254740991)}`;
    const Refresh_key = `${Math.floor(Math.random() * -9007199254740991)}`;
    const token_access=jwt.sign({id: id,username: username},Secure_key,{ expiresIn: "0s" });
    const refresh_access=jwt.sign({id: id,username: username},Refresh_key,{ expiresIn: "0s" });
    res.status(200).json({
        message: 'Đăng xuất thành công',
        token_access: token_access,
        refresh_access: refresh_access,
    });
});