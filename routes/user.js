// const express = require("express");
// const router = express.Router();
// const connectMySQL = require('./service/connect_database'); // import hàm connect
// const createTable = require('./service/create_table'); // import hàm tạo bảng
// const registerUser = require('./service/register'); // import hàm đăng ký user
// const loginUser = require('./service/login'); // import hàm đăng nhập user
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
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *                      - email
 *              properties:
 *                  username:
 *                      type: string
 *                      example: "nguyenvana"
 *                  password:
 *                      type: string
 *                      example: "123456"
 *                  email:
 *                      type: string
 *                      example: "nguyenvana"
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
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *              properties:
 *                  username:
 *                      type: string
 *                      example: "nguyenvana"
 *                  password:
 *                      type: string
 *                      example: "123456"
 *                  email:
 *                      type: string
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
 */
router.get("/cdce", (_req, res) => {
    try {
        // connectMySQL()
        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
router.post("/cdce", (_req, res) => {
    try {
        // createTable()
        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
router.post("rr", (_req, res) => { 
    try {
        // registerUser("nguyenvana", "123456", "nguyenvana@gmail.com");

        res.status(201).json({
            message: '✅ Thêm tài khoản thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Thêm tài khoản thât bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

module.exports = router;
