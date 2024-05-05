import mongoose from 'mongoose';

var userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true,'Username is required'],
        
    },
    email:{
         type:String,
         required:[true,'EmailId is required'],
         unique:true
    },
    password:{
         type:String,
         required:[true,'password is required'],

    },
    isAdmin:{
       type:Boolean,
       default:false
    }
    
});

export default mongoose.model('User',userSchema);