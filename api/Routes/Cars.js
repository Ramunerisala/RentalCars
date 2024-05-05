import express from 'express';
import Cars from '../models/Cars.js';
import Branch from '../models/Branches.js';
import errorhandler from '../middleware/errorhandler.js';
var router=express.Router();

router.get('/getAll',async (req,res,next)=>{

try{
    var data=await Cars.find();
    res.status(200).json(data);

}catch(error){
    return next(errorhandler(error.status,error.message));
}


});

router.post('/add',async(req,res,next)=>{
    try{ 
        var car=req.body;var {name,color,place,image,capacity}=car;
        console.log(car);
        var branch=await Branch.findOne({name:place});
        if(!branch){return next(errorhandler(404,'This place is not exist to add car'));}
        var newCar=await Cars.create({name:name,color:color,available:place,Images:image,capacity:capacity});
        var newBranch=await Branch.findByIdAndUpdate(branch._id,{$push:{cars:newCar._id},$inc:{available:-1}},{new:true});console.log(newBranch);
        res.status(200).json(newCar);

    }catch(error){
        return next(errorhandler(error.status,error.message));
    }
});

router.delete('/delete/:id',async (req,res,next)=>{
    try{
    var car=await Cars.findById(req.params.id);
    var branch=await Branch.findOne({name:car.available});
    if(!branch){return next(errorhandler(404,'The car is not present in the given location!'));}
    car=await Cars.findByIdAndDelete(req.params.id);
    var updatedBranch=await Branch.findByIdAndUpdate(branch._id,{$pull:{cars:car._id},$inc:{available:1}},{new:true});
    res.status(200).json('Car with '+car._id+' '+car.name+' is deleted succefully');
    }catch(error){
        console.log(error.message);
        return next(errorhandler(error.status,error.message));
    }
    

});

router.put('/edit/:id',async(req,res,next)=>{
    try{
    var oldCar=await Cars.findById(req.params.id);var {name,place,color,capacity,availability,image}=req.body;
    console.log(oldCar);console.log(req.body);
    if(oldCar.available!=place){
        console.log('hii');
        var newBranch=await Branch.findOne({name:place});var oldBranch=await Branch.findOne({name:oldCar.available});
        oldBranch=await Branch.findByIdAndUpdate(oldBranch._id,{$pull:{cars:req.params.id},$inc:{available:1}},{new:true});console.log(oldBranch);
        newBranch=await Branch.findByIdAndUpdate(newBranch._id,{$push:{cars:req.params.id},$inc:{available:-1}},{new:true});console.log(newBranch);
    }
    var newCar=await Cars.findByIdAndUpdate(req.params.id,{name:name,availability:Boolean(availability-'0'),capacity:capacity,available:place,Images:image,color:color},{new:true});
    console.log(newCar);
    res.status(200).json('The car is updated succesfully');
    }catch(error){
        console.log(error.message);return next(errorhandler(error.status,error.message));
    }
})

export default router;