/// Authorizes registered users

const { verify } = require('jsonwebtoken');
const {logger} = require('../startup/logger');

module.exports = {
    checkToken: (req,res,next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.JWT_TOKEN, (err,decoded) => {
                if (err) {
                    logger.error('Access denied. Invalid token.');
                    return res.status(400).send("Invalid email or password");
                } else {
                    next();
                }
            });
        } else {
            logger.error('Access denied. Unauthorized user.');
            return res.status(401).send("Access denied. Unauthorized user.");
        }
    }
};