const express=require('express');
const router=express.Router();
const{bookAppointment}=require('../controller/appointmentController');
const{protectRoute}=require('../middleware/protectRoute');

router.post("/bookAppointment", protectRoute, bookAppointment);
module.exports=router; 







