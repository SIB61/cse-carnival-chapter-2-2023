import {
  requestAppointment,
  updateAppointment,
} from "@/lib/service/appointment";

const handler = async (req, res) => {
  switch (req.method) {
    case "PUT":
      const { id } = req.query;
      const { status, time } = req.body;
      const appointment = await updateAppointment(id, status, time);
      if (appointment) {
        return res.status(200).json(appointment);
      }

    default:
      res.status(405);
      throw new Error("Method Not Allowed");
  }
};

export default handler;
