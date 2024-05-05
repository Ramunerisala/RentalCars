import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/Users.js';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import cookieParser from 'cookie-parser';
import User from './models/Users.js';
import errorhandler from './middleware/errorhandler.js';
import branchRouter from './Routes/Branches.js';
import carsRouter from './Routes/Cars.js';
import bookingsRouter from './Routes/Bookings.js';
var app=express();
const client=new OAuth2Client('521212712721-tklif6bqdaustua5bqundsntbkh4rgin.apps.googleusercontent.com');

// app.use(cors());
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());



mongoose.connect('mongodb://127.0.0.1:27017/Rentalcars');
mongoose.connection.on('connected',()=>{
    console.log('database connected succesfully');
});
mongoose.connection.on('Error',(err)=>{
    console.log(err);
});
const users=[];
app.use('/',userRouter);
app.use('/branch',branchRouter);
app.use('/cars',carsRouter);
app.use('/bookings',bookingsRouter);
app.post('/api/google-login',async(req,res,next)=>{
    console.log('hii');
    const {token}=req.body;
    const ticket=await client.verifyIdToken({idToken:token,audience:'521212712721-sdcq5ao8ju5aehpufg420j1ftgksp640.apps.googleusercontent.com'});
    const {name,email,picture}=ticket.getPayload();console.log(name);
    upsert(users,{name,email,picture});
    const oldUser=await User.findOne({email});
    console.log(oldUser);
    if(oldUser!=null && (oldUser.password!='xxx')){return next(errorhandler(404,'You are already registered!'));}
    if(oldUser!=null){await User.findByIdAndDelete(oldUser._id);}
    
        var newuser=await User.create({username:name,email,password:'xxx'});
        console.log(newuser);
    res.json(newuser);
});
app.use((err,req,res,next)=>{
    console.log(err.status);
 return res.status(err.status).json(err.message);
});


function upsert(array,item){
    const i=array.findIndex((_item)=>_item.email===item.email);
    if(i>=0){array[0]=item;}
    else{array.push(item);}
}

app.listen(4000,()=>{
    console.log('port 4000 is listening')
});
