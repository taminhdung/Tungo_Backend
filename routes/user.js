const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Database
 *   description: Quản lý Database
 * /ctde:
 *   get:
 *      summary: Kiểm tra kết nối Database
 *      tags: [Database]
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
 *                                  example: "✅ Kết nối database thành công."
 *          500:
 *              description: Kết nối thất bại
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "❌ Kết nối database thất bại.\n Báo lỗi: <lỗi cụ thể>"
    
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
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
router.get("/ln", (req, res) => {
    res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

module.exports = router;
