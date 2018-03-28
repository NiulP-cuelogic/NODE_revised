var Joi = require('joi');
var Boom = require('boom');



var bodySchema = {
    email:Joi.string().email(),
    firstname:Joi.string(),
    lastname:Joi.string(),
    password:Joi.string().min(3).max(20)
}

module.exports = (req,res,next)=>{
    Joi.validate(req.body,bodySchema,(err,result)=>{
        if(err){
            console.log('err occurred...');
            res.send(Boom.badRequest("Invalid form data"))
        }
        else{
            console.log(result);
            next();
        }
    })
}