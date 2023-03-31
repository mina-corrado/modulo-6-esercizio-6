var jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const authorization = req.header("Authorization");
    // console.log("auth => ",authorization);
    try {
        if (!authorization){
            return next(new Error("No Authorization header"));
        }
        const token = authorization.split(" ")[1];
        const user = jwt.verify(token, jwt_secret);
        req.body.id = user.id;
        // console.log("user => ",user)
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = auth;