const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');

require('dotenv').config();

const PORT=4000;   

app.use(express.json()); 
app.use(cookieParser());   


const {dbConnect}=require('./db/database');
dbConnect()

const doctorRoute=require('./routes/doctor');
const userRoute=require('./routes/userRoute');
const appointmentRoute=require('./routes/appointment');  

app.use('/api/v1', doctorRoute);
app.use('/api/v1', userRoute);  
app.use('/api/v1',appointmentRoute); 


app.listen(PORT, ()=>{
    console.log(`App started at PORT ${PORT}`); 
})