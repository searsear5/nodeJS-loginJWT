const jwt = require("jsonwebtoken")


exports.authmid = (req,res,next)=>{
    try {
        const token = req.header("x-auth-token")
        if (!token) {
            return res.status(401).json({message:"no token authorization deny"})
        }
        const verifyToken = jwt.verify(token,"secret",(err,decode)=>{
            if (err) {
                return res.status(401).json({message:"token invalid"})
            }else{
                console.log('token',verifyToken)
                req.user = decode
                console.log(token)
                next();
            }
        })
        
        
    } catch (err) {
        res.status(500).json({message:"sever error middleware"})
        
    }
}