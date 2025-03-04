
const User=require('../models/user.model'); 
const bcrypt=require('bcryptjs');
const genrateTokenAndSetCookie=require('../utils/generate');  


exports.signup=async(req,res)=>{
  try {
    const{firstName,lastName,password,confirmPassword,gender,userName}=req.body;
    if(password !== confirmPassword){
        return res.status(401).json({
            success:false,
            error:"password do not match"
        })
    }
    const check= await User.findOne({userName});
    if(check){
        return res.status(401).json({
            success:false,
            error:"User already exsists"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt); 

    const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser= await User.create({  
        firstName,
        lastName,
        userName,
        gender,
        password:hashPassword, 
        profilePic:gender==="Male"? (boyProfilePic):(girlProfilePic)
    });

    if(newUser){
        genrateTokenAndSetCookie(newUser._id,res);
        return res.status(201).json({
            _id:newUser._id,
            firstName:newUser.firstName, 
            lastName:newUser.lastName, 
            userName:newUser.userName, 
            profilePic:newUser.profilePic
     
     
         })
    }
    else{
        res.status(400).json({
            error:"Invalid data"
        }) 
    }
  } catch (error) {
    console.log("error occured in signup ",error); 
    return res.status(500).json({
        success:false,
        error:"Internal server error" 
       

 
 
     })
  }


} 

exports.login=async(req,res)=>{
    try {
        const{userName,password}=req.body; 
        const user= await User.findOne({userName}); 

        if(!user){
            return res.status(401).json({
                success:false,
                error:"user do not exsists"
            })
        }

        const isPasswordCorrect= await  bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                error:"password is wrong "
            })
        }
        genrateTokenAndSetCookie(user.id,res);
        return res.status(200).json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            profilePic:user.profilePic

        })

    } catch (error) {
        console.log("errror while login in",error.message);
        return res.status(500).json({
            success:false,
            error:"Internal server error" 
        })
    }
}

exports.logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});  
        res.status(200).json({
          message:"logged out succesfully"
       })
        
    } catch (error) {
        res.status(200).json({ 
            message:"failed to log out"  
         })
        
    }
}

exports.getusers=async(req,res)=>{
   try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } 
    console.log(user); 
    res.status(200).json(user);
   
   } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
   }
}




