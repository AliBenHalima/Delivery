const SignUp = require("../Controllers/SignController");
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token) res.status(401).send("Access denied");
    try {

    const verified = jwt.verify(token,"my-secret-token");
    req.verified =verified;
    next();
    }
     catch(err){
        res.send("Invalid Token");
    }

}