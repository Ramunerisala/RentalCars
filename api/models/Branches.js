import express from 'express';
import mongoose from 'mongoose';

var BranchSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please mention branch name']
    },
    capacity:{
        type:Number,
        required:true,
    },
    available:{
        type:Number,
        required:0,
    },
    cars:{
        type:[String],
        required:true
    }
});

export default mongoose.model('Branch',BranchSchema);