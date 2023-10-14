import appointment from "@/models/appointment";
import { createOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const requestAppointment = async (req, res) => {
  const session = await getServerSession(req, res, createOptions(req));
  console.log(session);
  const appointmentData = req.body;
  appointmentData.consultee = session.user._id;
  const { __v, ...createdAppointment } = await appointment
    .create(appointmentData)
    .then((obj) => obj.toObject());
  return res.status(201).json(createdAppointment);
};

export { requestAppointment };
