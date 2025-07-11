const jwt = require('jsonwebtoken');
const User = require('./Models/userModel'); // Đảm bảo đường dẫn đúng đến mô hình User
const SECRET =  'N27062025J'; // Thay bằng secret của bạn

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        
        const user = await User.findById(decoded.id); 
        if (!user|| user.curruntToken !== token) {
            return res.status(401).json({ message: 'Session expired or logged in elsewhere' });
        }
        req.user = { id: user._id, username: user.username }; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục xử lý request
    }catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }

}

module.exports = authMiddleware;