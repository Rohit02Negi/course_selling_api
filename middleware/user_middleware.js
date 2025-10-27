
require('dotenv').config();
const jwt = require('jsonwebtoken');

// avoide circular dependency by moving middleware to seperate file

function userMiddleware(req, res, next) {
    const gettoken = req.headers.token;
    const decode = jwt.verify(gettoken, process.env.JWT_USER_SECRET);

    if(decode) {
        req.userID = me._id;
        console.log("User ID from middleware:", req.userID);
        next();
    }else {
        res.status(401).json({ msg: "Unauthorized" });
    }

}


module.exports = {
    userMiddleware: userMiddleware
}