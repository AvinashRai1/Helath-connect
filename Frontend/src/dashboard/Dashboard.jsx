import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbardash from "./Navbardash";
import Appointment from "./Appintment";


const Dashboard = () => {
 

   
    

    return (
        <div> 
          <Navbardash/>  
          <Appointment />   
        </div>  
    );
};

export default Dashboard; 
