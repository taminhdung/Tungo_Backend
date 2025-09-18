const express = require("express");
const router = express.Router();
const connectMySQL = require('../service/connect_database');
const createTable = require('../service/create_table'); // import hàm tạo bảng
const registerUser = require('../service/register'); // import hàm đăng ký user
const loginUser = require('../service/login'); // import hàm đăng nhập user
const jwt = require('jsonwebtoken');
/**
 * @swagger
 *  tags:
 *      name: Dữ liệu
 *      description: Quản lý dữ liệu
 * /ctde:
 *   get:
 *      summary: Kiểm tra kết nối dữ liệu
 *      tags: [Dữ liệu]
 *      responses:
 *          200:
 *              description: Kết nối thành công
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "✅ Kết nối dữ liệu thành công."
 *          500:
 *              description: Kết nối thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Kết nối dữ liệu thất bại.\n Báo lỗi: <lỗi cụ thể>"
 * @swagger
 * tags:
 *      name: Bảng
 *      description: Quản lý bảng 
 * /cete:
 *   post:
 *      summary: Kiểm tra tạo bảng
 *      tags: [Bảng]
 *      responses:
 *          200:
 *              description: Tạo thành công
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "✅ Tạo bảng thành công."
 *          500:
 *              description: Tạo thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Tạo bảng thất bại.\n Báo lỗi: <lỗi cụ thể>"
 * @swagger
 * tags:
 *      name: Người dùng
 *      description: Quản lý người dùng
 * /rr:
 *   post:
 *      summary: Kiểm tra tạo tài khoản
 *      tags: [Người dùng]
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                         - username
 *                         - password
 *                         - email
 *                 properties:
 *                     username:
 *                         type: string
 *                     password:
 *                         type: string
 *                     email:
 *                         type: string
 *                 example: 
 *                     username: "nguyenvana"
 *                     password: "123456"
 *                     email: "nguyenvana@gmail.com"
 *      responses:
 *          200:
 *              description: Tạo thành công
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "✅ Tạo tài khoản thành công."
 *          500:
 *              description: Tạo thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Tạo tài khoản thất bại.\n Báo lỗi: <lỗi cụ thể>"
 * /ln:
 *   post:
 *      summary: Kiểm tra đăng nhập tài khoản
 *      tags: [Người dùng]
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                         - username
 *                         - password
 *                 properties:
 *                     username:
 *                         type: string
 *                     password:
 *                         type: string
 *                 example: 
 *                     username: "nguyenvana"
 *                     password: "123456"
 *      responses:
 *          200:
 *              description: Đăng nhập thành công
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "✅ Đăng nhập tài khoản thành công."
 *                              id:
 *                                  type: integer
 *                                  example: 1
 *                              username:
 *                                  type: string
 *                                  example: "nguyenvana"
 *                              token_access:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                              refresh_access:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *          401:
 *              description: Đăng nhập thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: Sai tên đăng nhập hoặc mật khẩu."
 *          500:
 *              description: Đăng nhập thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: <lỗi cụ thể>"
 */
router.get("/cdce", async (_req, res) => {
    try {
        await connectMySQL();
        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
router.post("/cdce", async (_req, res) => {
    try {
        await createTable();
        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
router.post("/rr", async (req, res) => { 
    try {
        const { username, password,email} = req.body;
        await registerUser(username, password,email);
        res.status(201).json({
            message: '✅ Thêm tài khoản thành công.qqq',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Thêm tài khoản thât bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
router.post("/ln", async (req, res) => { 
    try {
        const { username, password} = req.body;
        const rows = await loginUser(username, password);
        const data_value = rows[0][0];
        const Secure_key = "9007199254740991";
        const Refresh_key = "-9007199254740991";
        const token_access = jwt.sign({ id: data_value.id, username: data_value.username }, Secure_key, { expiresIn: "15m" });
        const refresh_access = jwt.sign({ id: data_value.id, username: data_value.username }, Refresh_key, { expiresIn: "7d" });
        console.log(`data=${data_value}`);
        if (rows.length > 0) {
            res.status(200).json({
                message: '✅ Đăng nhập tài khoản thành công.',
                id: data_value.id,
                username: data_value.username,
                token_access: token_access,
                refresh_access: refresh_access,
            });
        } else {
            res.status(401).json({
                message: `❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: Sai tên đăng nhập hoặc mật khẩu.`,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `❌ Đăng nhập tài khoản thât bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

module.exports = router;
