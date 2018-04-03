var Joi = require('joi');
var Boom = require('boom');



var bodySchema = {
    email:Joi.string().email(),
    firstname:Joi.string(),
    lastname:Joi.string(),
    password:Joi.string().min(3).max(20),
    userid:Joi.string().alphanum().min(24)
}

module.exports.validate = (req,res,next)=>{
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

module.exports.checkObjectId = (req,res,next)=>{
    Joi.validate(req.params.id,bodySchema.userid,(err,result)=>{
        if(err){
            res.send(Boom.badRequest("ObjectId is invalid.."))
        }
        else{
            console.log(result);
            next();
        }
    })
}