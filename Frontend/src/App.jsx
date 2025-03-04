import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import DoctorDetails from './components/DoctorDetails' 
import Contact from './components/Contact'  
// import {GoogleGenerativeAI} from '@google/generative-ai'
import Home from './components/Home'   
import Login from './components/Login'
import Dashboard from './dashboard/Dashboard'
import { useState } from 'react'


 
const App = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await fetch("/api/v1/getuser", {
                  method: "GET",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" }
              });

              if (response.ok) {
                  const data = await response.json();
                  setUser(data); // ✅ User is logged in
                  console.log(data); 
              } else {
                  setUser(null); // ✅ No user found
              }
          } catch (error) {
              console.error("Error checking user:", error.message);
              setUser(null);
          }
      };

      fetchUser();
  }, []);

  
  return ( 
    <div className='h-screen text-red-400'> 
      { !user && <Navbar/> }   
      
      <Routes>

        <Route path='/' element={<Home/>}/>  
        <Route path='/docdetails/:spe' element={<DoctorDetails/>}/> 
        <Route path='/contact' element={<Contact/>}/> 
        <Route path='/login' element={<Login/>}/>  
        <Route path='/dashboard' element={<Dashboard/>}/>   
        
      </Routes> 
    </div>
  )
}

export default App