
// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const  User_Secret  = process.env.JWT_USER_SECRET;

// // avoide circular dependency by moving middleware to seperate file

// function userMiddleware(req, res, next) {
//     const gettoken = req.headers.token;
//     const decode = jwt.verify(gettoken, User_Secret);

//     if(decode) {
//         req.userID = decode.id;
//         console.log("User ID from middleware:", req.userID);
//         next();
//     }else {
//         res.status(401).json({ msg: "Unauthorized" });
//     }

// }


// module.exports = {
//     userMiddleware: userMiddleware
// }

require('dotenv').config();
const jwt = require('jsonwebtoken');
const  secret  = process.env.JWT_USER_SECRET;

function user_middleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userID = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

module.exports = user_middleware;