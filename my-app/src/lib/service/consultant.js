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

const getConsultantsFromDB = async () => {
  await connectDb();
  const consultants = await user
    .find({
      role: "CONSULTANT",
      "consultantData.isVerified": true,
    })
    .select("-password -__v")
    .lean();
  return { consultants };
};

const getConsultant = async (req, res) => {
  await connectDb();
  const { id } = req.query;
  const consultant = await user.findById(id).select("-password -__v").lean();
  return res.status(200).json(consultant);
};

const getConsultantFromDB = async (id) => {
  await connectDb();
  const consultant = await user.findById(id).select("-password -__v").lean();
  return { consultant };
};

export {
  getConsultants,
  getConsultantsFromDB,
  getConsultant,
  getConsultantFromDB,
};
