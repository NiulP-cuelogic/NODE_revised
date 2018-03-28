var jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    try{
        var token  = req.headers.authorization.split(" ")[1];
        console.log(token);
        var decoded = jwt.verify(token,"secretkey");
        req.token = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Auth has  failed..."
        })
    }
    
    

}   
