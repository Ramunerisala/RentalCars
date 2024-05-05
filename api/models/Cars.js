import express from 'express';
import mongoose from 'mongoose';
var CarSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,'Please type car name']
    },
    availability:{
        type:Boolean,
        default:true
    },
    capacity:{
        type:Number,
        required:[true,'Please mention max capacity of car']
    },
    available:{
        type:String,
        required:true,
        
    },
    color:{
        type:String,
        required:true
    },
    Images:{
        type:String,
    },
    Rating:{
        type:Number,
        default:0
    },
    Distance:{
        type:Number,
        default:0
    },
    Duration:{
        type:Number,
        default:0
    }

});

export default mongoose.model('Car',CarSchema);