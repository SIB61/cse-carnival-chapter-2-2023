import consultant from "@/models/consultant";
import user from "@/models/user";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await user.create(req.body);
      break;

    default:
      res.status(400);
      res.send();
  }
};
