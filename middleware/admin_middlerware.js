require('dotenv').config();
const jwt = require('jsonwebtoken');
const  secret  = process.env.JWT_ADMIN_SECRET;

function admin_middlerware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userID = decoded._id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

module.exports = admin_middlerware;