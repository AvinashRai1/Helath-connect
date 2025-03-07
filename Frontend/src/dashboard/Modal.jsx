import { useState } from "react";

const Modal = ({ doctor, onClose }) => {
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (!appointmentDate || !appointmentTime) {
            alert("Please select a date and time!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://helath-connect.onrender.com/api/v1/bookAppointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({
                    doctorId: doctor._id,
                    date: appointmentDate,
                    time: appointmentTime,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert("Appointment booked successfully!");
                onClose();
            } else {
                alert("Failed to book appointment!");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
                <p className="text-gray-700"><strong>Doctor:</strong> {doctor.name}</p>
                <p className="text-gray-700"><strong>Specialty:</strong> {doctor.speciality}</p>

                {/* Date and Time Input */}
                <div className="mt-4">
                    <label className="block text-gray-600">Select Date:</label>
                    <input 
                        type="date" 
                        className="border p-2 rounded w-full" 
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-600">Select Time:</label>
                    <input 
                        type="time" 
                        className="border p-2 rounded w-full" 
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button 
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" 
                        onClick={handleBooking}
                        disabled={loading}
                    >
                        {loading ? "Booking..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;  
