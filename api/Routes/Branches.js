import express from 'express';
import Branch from '../models/Branches.js';
import errorhandler from '../middleware/errorhandler.js';
var router=express.Router();

router.post('/addBranch',async(req,res,next)=>{
    try{
        var branch=req.body;console.log(branch);
        var {place,capacity,available}=branch;
        var oldBranch=await Branch.findOne({name:place});
        if(oldBranch!=null){return next(errorhandler(404,'This branch is already exist!'));}
        var newBranch=await Branch.create({name:place,capacity,available:capacity});
        res.status(200).json('New branch'+place+'is added to our EagleC.com')
    }catch(error){
        console.log(error);
        return next(errorhandler(error.status,error.message));
    }
});

router.get('/getAll',async(req,res,next)=>{
    try{
         var data=await Branch.find();
         res.status(200).json(data);

    }catch(error){
       console.log(error);
       return next(errorhandler(error.status,error.message));
    }
});
router.delete('/delete/:id',async(req,res,next)=>{
    try{console.log(req.params.id);
        var branch=await Branch.findByIdAndDelete(req.params.id);
        console.log(branch);
        res.status(200).json(branch.name+'is succesfully removed from EagleC.com');
    }catch(error){
        console.log(error);
        return next(errorhandler(error.status,error.message));
    }
});

router.put('/edit/:id',async(req,res,next)=>{
    try{
        console.log(req.body);
        var branch=await Branch.findById(req.params.id);console.log(branch);
        var updateBranch=await Branch.findByIdAndUpdate(req.params.id,{name:req.body.place,capacity:req.body.capacity,available:req.body.occupied},{new:true});
        console.log(updateBranch);
        res.status(200).json(branch.name+' is updated succesfully!');
    }catch(error){
        console.log(error);
        return next(errorhandler(error.status,error.message));
    }
    
})
export default router;