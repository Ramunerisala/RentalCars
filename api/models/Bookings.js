import mongoose from 'mongoose';

var BookingSchema=new mongoose.Schema({

    email:{
        type:String,
        required:[true,'Email is mandatory']
    },
    carId:{
        type:String,
        required:true
    },
    pickUpPoint:{
        type:String,
        required:true
    },
    dropOffPoint:{
        type:String,
        
    },
    startDate:{
        type:Date,
        
    },
    endDate:{
        type:Date,
        
    },
    price:{
        type:Number
    },
    enable:{
        type:Boolean,
        default:true
    }


});
export default mongoose.model('Booking',BookingSchema);