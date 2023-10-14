import user from "@/models/user";
const { default: connectDb } = require("../db/connect");

const getConsultants = async (req, res) => {
  await connectDb();
  const consultants = await user
    .find({
      role: "CONSULTANT",
      "consultantData.isVerified": true,
    })
    .select("-password -__v")
    .lean();
  return res.status(200).json(consultants);
};

export { getConsultants };
