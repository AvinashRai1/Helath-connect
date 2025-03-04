const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectRoute=async(req,res,next)=>{   
    try {
        
        const token=req.cookies.jwt;  
       
          if(!token){
            return res.status(401).json({  
                error:"No token provided" 
            }) 
          }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                error:"Unauthorised Invalid token"  
            }) 
        }
        const user= await User.findById(decoded.userId).select("-password");
        if(!user){  
            return res.status(401).json({ 
                error:"No user present "
            }) 
        }
        req.user=user; 
        next(); 
    } catch (error) {
        console.log("error in protected route",error.message);  
        return res.status(500).json({
            error:"Internal Server error"
        })
    }
} 
