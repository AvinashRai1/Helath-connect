const mongoose=require('mongoose');
require('dotenv').config();


// console.log(MONGODB_URL);

exports.dbConnect=async()=>{ 
    try{
        mongoose.connect(process.env.MONGODB_URL).then(()=>{ 
            console.log("DB connetion successfull"); 
        }) 
    } 
    catch(err){
        console.log(err.message);
    }
}