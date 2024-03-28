const jwt = require("jsonwebtoken");
const Users = require("@models/Users/User");



const createUserToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user: {
                id: userId,
            },
        };
    
        jwt.sign(
            payload,
            process.env.jwtSecret,
            {
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) {
                    return resolve({isError: true, error: err, token: null});
                }
                
                return resolve({isError: false, error: err, token: token});
            }
        );
    });
}

module.exports = {createUserToken};