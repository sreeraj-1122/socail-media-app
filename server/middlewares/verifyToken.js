import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token; // Safely access cookies
    if (!token) {
        return res.status(403).json({ success: false, message: 'Token is missing' });
    }

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret key
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default verifyToken;
