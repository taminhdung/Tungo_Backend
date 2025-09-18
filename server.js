const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const connectMySQL = require('./service/connect_database'); // import hàm connect
const createTable = require('./service/create_table'); // import hàm tạo bảng
const registerUser = require('./service/register'); // import hàm đăng ký user
const loginUser = require('./service/login'); // import hàm đăng nhập user
const cors = require("cors");
const swaggerSpec = require("./docs/swagger");
const userRoutes = require("./routes/user");
const swaggerUi = require('swagger-ui-express');


const app = express();// khởi tạo Express app
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // Cho phép đọc JSON từ body
app.use("/", userRoutes);
// Dùng Swagger docs
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            layout: "BaseLayout"
        },
    })
);


const PORT = process.env.PORT || 9999; // Render sẽ cung cấp PORT

app.listen(PORT, () => {
    console.log(`✅ Server chạy tại https://tungo-backend.onrender.com/api-docs`);

    async function init() {
        try {
            await connectMySQL();
            console.log('✅ Kết nối database thành công.');
        } catch (err) {
            console.error(`❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`);
        }

        try {
            await createTable();
            console.log('✅ Tạo bảng thành công.');
        } catch (err) {
            console.error(`❌ Tạo bảng thất bại.\n Báo lỗi: ${err.message}`);
        }
    }

    init();
});


app.get('/ctde', async (_req, res) => {// route kiểm tra kết nối database
    try {
        const connect = await connectMySQL();

        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

app.post('/cete', async (_req, res) => {// route tạo bảng
    try {
        await createTable(); // gọi hàm tạo bảng

        res.status(201).json({
            message: '✅ Tạo bảng thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Tạo bảng thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

app.post('/rr', async (req, res) => {// route đăng ký user
    try {
        const { username, password, email } = req.body;
        await registerUser(username, password, email); // gọi hàm tạo bảng

        res.status(201).json({
            message: '✅ Thêm tài khoản thành công.',
        });
    } catch (err) {
        res.status(500).json({
            message: `❌ Thêm tài khoản thât bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

app.post('/ln', async (req, res) => {// route đăng nhập user
    const { username, password } = req.body;
    const rows = await loginUser(username, password);
    const data_value = rows[0][0];
    const Secure_key = `${Math.floor(Math.random() * 9007199254740991)}`;
    const Refresh_key = `${Math.floor(Math.random() * -9007199254740991)}`;
    const token_access = jwt.sign({ id: data_value.id, username: data_value.username }, Secure_key, { expiresIn: "15m" });
    const refresh_access = jwt.sign({ id: data_value.id, username: data_value.username }, Refresh_key, { expiresIn: "7d" });
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
            message: `❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: ${err.message}`,
        });
    }
});

app.post('/lt', async (req, res) => {// route đăng xuất user
    const { id, username } = req.body;
    const Secure_key = `${Math.floor(Math.random() * 9007199254740991)}`;
    const Refresh_key = `${Math.floor(Math.random() * -9007199254740991)}`;
    const token_access = jwt.sign({ id: id, username: username }, Secure_key, { expiresIn: "0s" });
    const refresh_access = jwt.sign({ id: id, username: username }, Refresh_key, { expiresIn: "0s" });
    res.status(200).json({
        message: '✅ Đăng xuất thành công.',
        token_access: token_access,
        refresh_access: refresh_access,
    });
});