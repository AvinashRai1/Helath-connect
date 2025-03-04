import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
    const [symptons, setsymptons] = useState("");
    const [output, setoutput] = useState("");
    const [history, sethistory] = useState([]); 
    const [loading, setloading] = useState(false);

    // const handleSearch = async () => {
    //     if (!symptons) {
    //         alert("Enter symptoms");
    //         return;
    //     } 
    //     setloading(true);
    //     const genAI = new GoogleGenerativeAI("AIzaSyBJj3BVfsR5FcU4y3fYyisL2jUX3rWpOZQ");   
    //     // console.log("API Key:", import.meta.env.VITE_GEN_API_KEY);    

    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });   

    //     const prompt = `I am having ${symptons} which doctor should I see only give specialization of doctors`;

    //     const result = await model.generateContent(prompt);
    //     const response = await result.response;
    //     const text = response.text();

    //     sethistory((prev) => [...prev, { inp: symptons, out: text }]);
    //     setoutput(text);
    //     console.log(text);
    //     setloading(false);
    // }
    const handleSearch = async () => {
        if (!symptons) {
            alert("Enter symptoms");
            return;
        }
        setloading(true);
        
        const genAI = new GoogleGenerativeAI("AIzaSyBJj3BVfsR5FcU4y3fYyisL2jUX3rWpOZQ");     
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });   
    
        const prompt = `I am having ${symptons}. Which doctor should I see? Provide the specializations in a well-formatted list with bullet points.`;
        
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();
    
            // Format output with line breaks
            text = text.replace(/\n/g, "<br />"); 
    
            sethistory((prev) => [...prev, { inp: symptons, out: text }]);
            setoutput(text);
        } catch (error) {
            console.error("Error fetching data:", error);
            setoutput("Sorry, an error occurred while fetching the information.");
        }
    
        setloading(false); 
    };
    

    useEffect(() => {
        console.log(history.length)   
    }, [history]);

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex items-center justify-center">
            <div className="max-w-[1200px] w-full p-8 bg-white rounded-lg shadow-lg">
                {loading ? (
                    <div className="max-w-[1000px] h-full min-h-[90vh] mx-auto flex flex-col justify-center gap-5 text-2xl text-center items-center py-20 font-medium text-purple-500">
                        <TypeAnimation
                            sequence={[
                                'Generating results...', 
                                1000,
                                'Please wait...',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '2em', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className="max-w-[1000px] h-full mx-auto flex flex-col items-start justify-start py-5 gap-5 text-gray-800">

                        <div className="inp w-full flex flex-col items-start gap-4">
                            <label htmlFor="symp" className="text-xl font-semibold text-gray-700">
                                Enter your symptoms to discover the medical specialties of available doctors.
                            </label>
                            <input
                                type="text"
                                id="symp"
                                value={symptons}
                                className="border w-full py-3 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition"
                                placeholder="Enter symptoms"
                                onChange={(e) => setsymptons(e.target.value)}
                            />
                        </div>

                        <button 
                            onClick={handleSearch}
                            className="btn bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all ease-in-out"
                        >
                            Discover Speciality
                        </button>

                        {history.map((his, idx) => {
                            return (
                                <div key={idx} className="res flex flex-col items-start justify-start gap-6 mt-6">

                                    <div className="flex flex-col items-start justify-start gap-2 bg-gray-50 p-4 rounded-xl shadow-lg w-full">
                                        <div className="text-lg font-medium text-purple-700">You 👨🏼‍🦰</div>
                                        <div className="text-base text-gray-700">{his.inp}</div>
                                    </div>

                                    <div className="flex flex-col items-start justify-start gap-2 bg-gray-50 p-4 rounded-xl shadow-lg w-full mt-4">
                                        <div className="text-lg font-medium text-blue-700">Chatbot 🤖</div>
                                        <div className="text-base text-gray-700" dangerouslySetInnerHTML={{ __html: his.out }}></div>

                                    </div> 

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home; 
