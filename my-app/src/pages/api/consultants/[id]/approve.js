import connectDb from "@/lib/db/connect";
import User from "@/models/user";
import { createOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async (req, res) => {
  await connectDb();

  const session = await getServerSession(req, res, createOptions(req));

  if (session.user.role != "ADMIN") {
    res.status(401);
    res.send();
    return;
  }

  const consultant = await User.findOne({
    _id: req.query.id,
    role: "CONSULTANT",
  });

  console.log(consultant);

  if (!consultant) {
    res.status(404);
    res.send();
    return;
  }

  consultant.consultantData.isVerified = true;
  await consultant.save();

  res.send();
};
