import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo7.svg';
import Contact from './Contact';

const Navbar = () => {
    const [SpecialityArr, setSpecialityArr] = useState([]);

    const fetchData = async () => {
        try {
            const output = await fetch('/api/v1/getAllDoctors');
            const res = await output.json();

            let tempArr = [];

            for (let i = 0; i < res.allDoc.length; i++) {
                let flag = true;
                for (let j = i + 1; j < res.allDoc.length; j++) {
                    if (res.allDoc[i].speciality === res.allDoc[j].speciality) {
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    tempArr.push(res.allDoc[i].speciality);
                }
            }

            setSpecialityArr(tempArr);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-white shadow-md py-4 z-50 sticky top-0">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
                {/* Logo Section */}
                <Link to="/">
                    <div className="flex items-center gap-3">
                        <img src={logo} className="h-[30px]" /> 
                        <div className="text-2xl font-semibold text-gray-800">Health Connect</div>
                    </div>
                </Link>

                {/* Navigation Section */}
                <div className="flex items-center gap-8">
                    {/* Speciality Dropdown */} 
                    <div className="relative group">
                        <h1 className="text-lg font-semibold text-gray-700 cursor-pointer">Speciality</h1>
                        <div className="w-[350px] bg-white absolute top-10 rounded-md scale-y-0 group-hover:scale-y-100 transition-all duration-300 origin-top flex flex-col items-start justify-start text-gray-700 py-3 px-5 gap-1 shadow-lg">
                            {SpecialityArr.length > 0 && SpecialityArr.map((spe, idx) => {
                                return (
                                    <Link to={`/docdetails/${spe}`} key={idx}>
                                        <div className="py-2 px-4 hover:bg-gray-100 rounded-md transition duration-200">
                                            {spe[0].toUpperCase() + spe.slice(1).toLowerCase()}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-purple-600 transition duration-300">
                       
                      <Link to='/contact'>
                      <h1>contact</h1> 
                      </Link>
                      
                     
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Navbar; 
