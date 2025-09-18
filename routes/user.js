const express = require("express");
const router = express.Router();

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
 * cete:
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
 */
router.get("/cdce", (_req, res) => {
    try {
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
        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});
// router.get("/ln", (req, res) => {
//     res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
// });

module.exports = router;
