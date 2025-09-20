const express = require('express');
const jwt = require('jsonwebtoken');
const connectMySQL = require('./service/connect_database');
const createTable = require('./service/create_table'); // import hàm tạo bảng
const registerUser = require('./service/register'); // import hàm đăng ký user
const loginUser = require('./service/login'); // import hàm đăng nhập user
const CheckEmail= require('./service/check_email');
const SendCode=require("./service/send_email");
const cors = require("cors");
const swaggerSpec = require("./docs/swagger");
const userRoutes = require("./routes/user");
const swaggerUi = require('swagger-ui-express');
const crypto=require('crypto');
const app = express();// khởi tạo Express app

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // Cho phép đọc JSON từ body
// Dùng Swagger docs
function setupApp(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: { layout: "BaseLayout" }
    }));

    app.use("/", userRoutes);
}

setupApp(app);

const PORT = process.env.PORT || 9999; // Render sẽ cung cấp PORT

// app.listen(PORT, () => {
//     console.log(`✅ Server chạy tại https://tungo-backend.onrender.com/api-docs`);

//     async function init() {
//         try {
//             await connectMySQL();
//             console.log('✅ Kết nối database thành công.');
//         } catch (e) {
//             console.error(`❌ Kết nối database thất bại.\n Báo lỗi: ${e.message}`);
//         }

//         try {
//             await createTable();
//             console.log('✅ Tạo bảng thành công.');
//         } catch (e) {
//             console.error(`❌ Tạo bảng thất bại.\n Báo lỗi: ${e.message}`);
//         }
//     }

//     init();
// });

const HOST = "localhost"

app.listen(PORT, HOST, () => {
    console.log(`✅ Server đang chạy tại http://${HOST}:${PORT}/api-docs`);
        async function init() {
        try {
            await connectMySQL();
            console.log('✅ Kết nối database thành công.');
        } catch (e) {
            console.error(`❌ Kết nối database thất bại.\n Báo lỗi: ${e.message}`);
        }

        try {
            await createTable();
            console.log('✅ Tạo bảng thành công.');
        } catch (e) {
            console.error(`❌ Tạo bảng thất bại.\n Báo lỗi: ${e.message}`);
        }
    }

    init();
});

app.get('/ctde', async (_req, res) => {// route kiểm tra kết nối database
    try {
        await connectMySQL();

        res.status(200).json({
            message: '✅ Kết nối database thành công.',
        });
    } catch (e) {
        res.status(500).json({
            message: `❌ Kết nối database thất bại.\n Báo lỗi: ${e.message}`,
        });
    }
});

app.post('/cete', async (_req, res) => {// route tạo bảng
    try {
        await createTable(); // gọi hàm tạo bảng

        res.status(201).json({
            message: '✅ Tạo bảng thành công.',
        });
    } catch (e) {
        res.status(500).json({
            message: `❌ Tạo bảng thất bại.\n Báo lỗi: ${e.message}`,
        });
    }
});

app.post('/rr', async (req, res) => {// route đăng ký user
    try {
        const { username, password, email } = req.body;
        await registerUser(username, password, email); // gọi hàm tạo bảng

        res.status(201).json({
            message: '✅ Thêm tài khoản thành công.',
            data:true
        });
    } catch (e) {
        res.status(500).json({
            message: `❌ Thêm tài khoản thất bại.\n Báo lỗi: ${e.message}`,
            data:false
        });
    }
});

app.post('/ln', async (req, res) => {
    try {
        const { username, password } = req.body;
        const rows = await loginUser(username, password);
        if (rows[0][0] != null) {
            const token_access = jwt.sign({ id: rows[0][0].id, username: rows[0][0].username }, "9007199254740991", { expiresIn: "15m" });
            const refresh_access = jwt.sign({ id: rows[0][0].id, username: rows[0][0].username }, "-9007199254740991", { expiresIn: "7d" });
            res.status(200).json({
                message: '✅ Đăng nhập tài khoản thành công.',
                id: rows[0][0].id,
                username: rows[0][0].username,
                token_access: token_access,
                refresh_access: refresh_access,
                data:true
            });
        } else {
            res.status(401).json({
                message: `❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: Sai tên đăng nhập hoặc mật khẩu.`,
                data:true
            });
        }
    } catch (e) {
        res.status(500).json({
            message: `❌ Đăng nhập tài khoản thất bại.\n Báo lỗi: ${e.message}`,
            data:false
        });
    }
});

app.post('/ckel', async (req,res)=>{
    try {
        const { email } = req.body;
        const rows = await CheckEmail(email);
        if (rows[0][0] !=null) {  // đúng chính tả
            const code=`${crypto.randomInt(1000,10000)}-${crypto.randomInt(1000,10000)}-${crypto.randomInt(1000,10000)}-${crypto.randomInt(1000,10000)}-${crypto.randomInt(1000,10000)}`;
            SendCode(email,code);
            res.status(200).json({
                message: '✅ Kiểm tra email thành công.',
                Code: code, 
                data: true
            });
        } else {
            res.status(500).json({
                message: `❌ Kiểm tra email thất bại.`,
                data:false
            });  
        }
    } catch (e){
        res.status(500).json({
            message: `❌ Kiểm tra email thất bại.\n Báo lỗi: ${e.message}`,
            data:false
        });
    }
});
