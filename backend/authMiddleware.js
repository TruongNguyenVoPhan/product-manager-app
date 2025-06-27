const jwt = require('jsonwebtoken');

const SECRET =  'N27062025J'; // Thay bằng secret của bạn

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục xử lý request
    }catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;