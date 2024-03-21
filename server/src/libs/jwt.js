const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require ("../config/config");
exports.createAccessToken=(payload)=> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            "secret123",
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        );
    })
}

