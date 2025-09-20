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
 *                              data:
 *                                  type: boolean
 *                                  example: true
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
 *                              data:
 *                                  type: boolean
 *                                  example: false
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
 *                              data:
 *                                  type: boolean
 *                                  example: true
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
 *                              data:
 *                                  type: boolean
 *                                  example: false
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
 *                     username: "buingoclinh461"
 *                     password: "123456"
 *                     email: "buingoclinh461@gmail.com"
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
 *                              data:
 *                                  type: boolean
 *                                  example: true
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
 *                              data:
 *                                  type: boolean
 *                                  example: false
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
 *                     username: "buingoclinh461"
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
 *                                  example: "buingoclinh461"
 *                              token_access:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                              refresh_access:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                              data:
 *                                  type: boolean
 *                                  example: true
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
 *                              data:
 *                                  type: boolean
 *                                  example: false
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
 *                              data:
 *                                  type: boolean
 *                                  example: false
 * @swagger
 * tags:
 *      name: Mật khẩu
 *      description: Quên mật khẩu
 * /ckel:
 *   post:
 *      summary: Kiểm tra email tồn tại
 *      tags: [Mật khẩu]
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                         - email
 *                 properties:
 *                     email:
 *                         type: string
 *                 example: 
 *                     email: "buingoclinh461@gmail.com"
 *      responses:
 *          200:
 *              description: Kiểm tra thành công
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "✅ Kiểm tra email thành công."
 *                              code:
 *                                  type: string
 *                                  example: 0000-0000-0000-0000-0000
 *                              data:
 *                                  type: boolean
 *                                  example: true
 *          500:
 *              description: Đăng nhập thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Kiểm tra email thất bại.\n Báo lỗi: <lỗi cụ thể>"
 *                              data:
 *                                  type: boolean
 *                                  example: false
 */

module.exports = router;
