const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Token không tồn tại hoặc sai định dạng." });
  }

  const token = authHeader.split(' ')[1]; // Lấy token sau "Bearer"

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Xác thực token
    req.user = decoded; // Gắn payload vào req.user để dùng ở route sau
    next(); // Tiếp tục
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token không hợp lệ hoặc hết hạn." });
  }
}

module.exports = authMiddleware;
