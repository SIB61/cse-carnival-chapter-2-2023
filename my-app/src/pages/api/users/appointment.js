import { requestAppointment } from "@/lib/service/appointment";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await requestAppointment(req, res);

    default:
      res.status(405);
      throw new Error("Method Not Allowed");
  }
};

export default handler;
