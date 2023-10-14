import appointment from "@/models/appointment";

const createAppointment = async (req, res) => {
  const appointmentData = req.body;
  const { __v, ...createdAppointment } = await appointment
    .create(appointmentData)
    .then((obj) => obj.toObject());
  return res.status(200).json(createdAppointment);
};

export { createAppointment };
