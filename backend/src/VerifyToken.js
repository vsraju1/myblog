const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json("Your are not authenticated")
    }
    jwt.verify(token, process.env.SECRET_KEY, async(err, data) => {
        if(err){
            return res.status(403).json("Token is inavlid")
        }
        req.userID = data._id
        next()
    })
}

module.exports = verifyToken