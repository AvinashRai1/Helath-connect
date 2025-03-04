import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import axios from 'axios'
 import Card from './Card.jsx'    




const DoctorDetails = () => {

    const location=useLocation();

    // console.log(location.pathname.split('/').at(-1));
    const speciality=location.pathname.split('/').at(-1); 
    console.log(speciality); 
    
    const [speArr, setspeArr] = useState([])

    

    const fetchData=async()=>{
        try{
           let res=await axios.post('/api/v1/getDoctors', {           
            speciality:speciality, 
           });  
           console.log(res.data.allDoc) 
           
         
        setspeArr(res.data.allDoc)
        }
        catch(err){
            console.log("error in fetching details",err.message);  
        }
    }

    useEffect(()=>{
        fetchData();
    }, [location.pathname])
  return (
    <div className='cont max-w-[1000px] mx-auto flex flex-row items-start justify-between flex-wrap gap-4 py-10 text-white'> 
         {speArr.map((doc, idx)=>{
             return <Card key={idx} {...doc}/>  
         })}
    </div>
  )
}

export default DoctorDetails