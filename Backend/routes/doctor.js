const express=require('express');
const router=express.Router();

const {addDoctor, getDoctor, getallDoctors}=require('../controller/doctorControler'); 
router.post('/addDoctor', addDoctor);
router.post('/getDoctors', getDoctor); 
router.get('/getAllDoctors', getallDoctors);   
 
module.exports=router;