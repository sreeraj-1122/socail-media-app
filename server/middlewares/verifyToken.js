import jwt from 'jsonwebtoken'


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send('Token is missing');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Add the decoded user information to request
        next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
};
export default verifyToken;
