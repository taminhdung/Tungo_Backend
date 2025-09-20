const nodemailer = require("nodemailer");

// 1. Tạo transporter (dịch vụ gửi email)
const transporter = nodemailer.createTransport({
    service: "Gmail", // hoặc SMTP khác
    auth: {
        user: "taminhdung.it@gmail.com",
        pass: "wdxq hcbi obpk ckuh" // dùng App Password nếu Gmail bật 2FA
    }
});

// 2. Hàm gửi email
async function SendCode(to, code) {
    const mailOptions = {
        from: '"Tungo" <taminhdung.it@gmail.com>',
        to: to,
        subject: "Mã xác thực",
        text: `Mã xác thực của bạn là: ${code}`, // text plain
html: `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Xác nhận mã code - TUNGO</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f2f2f2; padding: 20px; color: #333;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 10px; border: 1px solid #ccc;">
    <div style="text-align: center;  color: #FC8E6A; margin-bottom: 20px; font-weight: bolder;">
      <h1>TUNGO</h1>
    </div>
    <div style="font-size: 16px;">
      Xin chào bạn.<br><br>
      Chúng tôi đã nhận được yêu cầu xác minh email của bạn. 
      Vui lòng nhập mã xác nhận dưới đây để cấp lại mật khẩu của bạn:
    </div>
    <div style="margin: 20px 0; padding: 15px; background-color: #FC8E6A; text-align: center; font-size: 24px; font-weight: bold; color: #333; letter-spacing: 3px; border-radius: 8px;">
      ${code}
    </div>
    <div style="font-size: 14px; color: #555; margin-top: 20px;">
      Không chia sẻ mã này với bất kỳ ai. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.
    </div>
    <div style="margin-top: 40px; font-size: 13px; color: #777; text-align: center;">
      Bản quyền © 2025 Tungo – Bảo mật là ưu tiên hàng đầu của chúng tôi.<br>
      <span style="display:none;">${Date.now()}</span>
    </div>
  </div>
</body>
</html>
`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Gửi email thành công.\n Thông tin: ${info.response}`);
        return true;
    } catch (e) {
        console.error(`Gửi email thất bại.\n Báo lỗi:${e}`);
        return false;
    }
}

module.exports = SendCode;
