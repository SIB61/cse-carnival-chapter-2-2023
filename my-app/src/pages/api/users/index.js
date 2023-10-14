import { createUser, getUsers } from "@/lib/service/user";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await createUser(req, res);

    case "GET":
      return await getUsers(req, res);

    default:
      res.status(405);
      throw new Error("Method Not Allowed");
  }
};

export default handler;
