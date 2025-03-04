const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({

    firstName:{
        type:String,
        required:true 

    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    confirmPassword:{
        type:String, 
       
        minLength:6
    }, 
    userName:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"] 
    },
    profilePic:{     
        type:String,
        default:"",
    }


},{timestamps:true})

module.exports=mongoose.model("User", userSchema); 
