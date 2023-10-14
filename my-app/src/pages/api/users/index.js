import { createUser } from "@/lib/service/user";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await createUser(req, res);

    default:
      res.status(405);
      throw new Error("Method Not Allowed");
  }
};

export default handler;
