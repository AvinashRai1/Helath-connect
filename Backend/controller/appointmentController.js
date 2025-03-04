const Appointment=require('../models/appointment.model');
const Doctor=require('../models/doctor.model'); 

exports.bookAppointment=async(req,res)=>{
    try {
        const { doctorId, date, time } = req.body;
        const userId = req.user.id; // Assuming user is authenticated via middleware

        // Validate input
        if (!doctorId || !date || !time) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId); 
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found!" });
        }

        // Check if the time slot is already booked
        const existingAppointment = await Appointment.findOne({ doctorId, date, time });
        if (existingAppointment) {
            return res.status(400).json({ success: false, message: "Time slot is already booked!" });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            doctorId,
            userId,
            date,
            time,
            status: "Pending" // Default status
        });

        // Save to database
        await newAppointment.save();

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully!",
            appointment: newAppointment
        });
    } catch (error) {
        console.error("Error booking appointment:", error); 
        return res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }
}

