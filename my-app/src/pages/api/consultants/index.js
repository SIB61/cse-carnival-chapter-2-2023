import { getConsultants } from "@/lib/service/consultant";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return await getConsultants(req, res);

    default:
      res.status(405);
      throw new Error("Method Not Allowed");
  }
};

export default handler;
