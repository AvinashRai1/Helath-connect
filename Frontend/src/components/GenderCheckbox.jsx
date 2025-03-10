import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex text-white'> 
        <div className='form-control'>
           <label className={`label gap-2 cursor-pointer ${selectedGender === "Male" ? "selected" : ""} `}> 
            <span className='label-text text-black px-3'>Male</span>     
            <input type='checkbox' className='checkbox border-slate-300' checked={selectedGender==="Male"} onChange={()=>onCheckboxChange("Male")}/>  
           </label>
        </div> 

        <div className='form-control'>
           <label className={`label gap-2 cursor-pointer ${selectedGender === "Female" ? "selected" : ""} `}> 
            <span className='label-text text-black px-3'>Female</span>    
            <input type='checkbox' className='checkbox border-slate-300'  checked={selectedGender==="Female"} onChange={()=>onCheckboxChange("Female")}/>    
           </label>  
        </div> 
      
    </div>
  )
}

export default GenderCheckbox