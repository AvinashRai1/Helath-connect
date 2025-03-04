const express=require('express');
const router=express.Router(); 

const{signup,login,logout,getusers}=require('../controller/userController');
const{protectRoute}=require('../middleware/protectRoute');
router.post('/signup',signup); 
router.post('/login',login); 
router.post('/logout',logout);  
router.get('/getuser',protectRoute,getusers);    

module.exports=router;
