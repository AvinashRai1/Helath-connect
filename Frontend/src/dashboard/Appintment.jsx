import { useEffect, useState } from "react";

import Modal from "./Modal";

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialty, setSpecialty] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    const fetchAllDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/v1/getAllDoctors", { method: "GET" });
            const data = await response.json();
            if (data.success) setDoctors(data.allDoc);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
        setLoading(false);
    };

    const fetchDoctorsBySpecialty = async () => {
        if (!specialty) {
            fetchAllDoctors();
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("/api/v1/getDoctors", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ speciality: specialty }),
            });
            const data = await response.json();
            if (data.success) setDoctors(data.allDoc);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
        setLoading(false);
    };

    // Handle "Book Now" click
    const handleBookNow = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Book an Appointment</h2>

            {/* Specialty Dropdown */}
            <div className="flex justify-center gap-4 mb-6">
                <select
                    className="border p-2 rounded-lg w-64 focus:ring-2 focus:ring-indigo-500"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                >
                    <option value="">All Specialties</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                </select>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    onClick={fetchDoctorsBySpecialty}
                >
                    Search
                </button>
            </div>

            {/* Doctor Cards */}
            {loading ? (
                <p className="text-center text-gray-600 text-lg">Loading doctors...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.length > 0 ? (
                        doctors.map((doc) => (
                            <div key={doc._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-800">{doc.name}</h3>
                                <p className="text-gray-600">{doc.speciality}</p>
                                <p className="text-gray-500">Experience: {doc.experience} years</p> 
                                <button 
                                    className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
                                    onClick={() => handleBookNow(doc)}
                                >
                                    Book Now
                                </button> 
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No doctors found.</p>
                    )} 
                </div>
            )}

            {/* Appointment Modal */}
            {isModalOpen && ( 
                <Modal 
                    doctor={selectedDoctor} 
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div> 
    );
};

export default Appointment;
