import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Bookings from '../models/Bookings.js';
import Branch from '../models/Branches.js';
import Car from '../models/Cars.js';
import errorhandler from '../middleware/errorhandler.js';
import main from '../middleware/nodemailer.js';
var router=express.Router();

router.post('/book',verifyToken,async(req,res,next)=>{
    var {id,name,color,capacity,pickuppoint}=req.body;var info=req.cookies.user;console.log(id,name,color,capacity,pickuppoint);console.log(info);
    try{
        console.log('hello');var today=new Date();
     var booking=await Bookings.create({email:info.email,carId:id,pickUpPoint:pickuppoint,startDate:today});
     console.log(booking);
    var branch=await Branch.findOneAndUpdate({name:pickuppoint},{$inc:{available:1},$pull:{cars:id}},{new:true});
     var car=await Car.findByIdAndUpdate(id,{$set:{availability:false}},{new:true});
     var html=`
<h1>Your booking is succesfull {username}</h1>
<h2>Here are the Reservation ID:{booking._id}</h2>
<h3>Have a nice trip.Enjoy!</h3>
`;
   html=html.replace('{booking._id}',booking._id);
   main(info.username,info.email,html);
     res.json('ok').status(200);


}catch(error){
    return next(errorhandler(error.status,error.message));
}
    
});

router.get('/active',verifyToken,async(req,res,next)=>{
var info=req.cookies.user;
try{
     var data=await Bookings.find({email:info.email});console.log(data);
     data=data.filter((item)=>item.enable);
     res.status(200).json(data);
}catch(error){
    console.log(error.message);
    return next(errorhandler(error.status,error.message));
}
})


export default router;
