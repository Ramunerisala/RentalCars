import express from 'express';
import User from '../models/Users.js';
import errorhandler from '../middleware/errorhandler.js';
import bcrypt from 'bcryptjs';
import main from '../middleware/nodemailer.js';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verifyToken.js';
import passport from 'passport';
var Router=express.Router();
var html=`
<h1>Thank you for your registration.{username}</h1>
<h2>Have a nice trip</h2>
`;
Router.post('/register',async (req,res,next)=>{
      
    try{
    var {username,email,password}=req.body;
    var oldUser=await User.findOne({email});
    console.log(oldUser);
    if(oldUser!=null && (oldUser.password!='xxx')){return next(errorhandler(404,"You are already registered"));}
    if(oldUser!=null){await User.findByIdAndDelete(oldUser._id);}
    var salt=bcrypt.genSaltSync(10);
    
    var hash=bcrypt.hashSync(password,salt);
    
    var newUser=await User.create({username,email,password:hash});
    console.log(newUser);
    main(username,email,html);
    res.status(200).json(req.body);
    }catch(error){
        return next(errorhandler(400,'please type valid credentials!'));
    }

});

Router.post('/login',async (req,res)=>{
    var {email,password}=req.body;
    try{
        var user=await User.findOne({email});
        if(!user){res.status(404).json('This email is not registered please try to register first');}
        else{
            var comparePassword=bcrypt.compareSync(password,user.password);
            
            if(!comparePassword){res.status(400).json('Sorry!Wrong credentials.Try again');}
            else{
                var token =jwt.sign({username:user.username,email,isAdmin:user.isAdmin},'I2PEoQdhAEeqNbS7iKluCeN5GBcqcqZ4+001DpT45vQ=');
                res.cookie('token',token,{httpOnly:true}).status(200).json('ok');
                
            }
        }
    }catch(error){console.log(error);}
})

Router.get('/profile',verifyToken,(req,res,next)=>{
    var info=req.cookies.user;console.log('hello');console.log(info);
    return res.status(200).json(info);
});

Router.get('/op/customers',async(req,res,next)=>{
    try{
        var data=(await User.find()).filter((item)=>item.isAdmin==false);
        
        res.status(200).json(data);
    }catch(error){
        return next(errorhandler(error.status,error.message));
    }
});

export default Router;