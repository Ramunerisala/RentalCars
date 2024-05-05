import jwt from 'jsonwebtoken';
import errorhandler from '../middleware/errorhandler.js';

const secret='I2PEoQdhAEeqNbS7iKluCeN5GBcqcqZ4+001DpT45vQ=';
var verifyToken=(req,res,next)=>{
    try{
    var token=req.cookies.token;
    if(!token){throw new Error('you are not logged in');}
    jwt.verify(token,secret,(err,info)=>{
        if(err){throw new Error('you are not authenticated')}
        
        res.cookie('user',info);
        console.log(info);
    });next();
     }catch(error){
        return next(errorhandler(error.status,error.message));
     }
};

export default verifyToken;