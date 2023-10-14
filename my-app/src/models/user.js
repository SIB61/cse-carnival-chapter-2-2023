import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["CONSULTEE", "CONSULTANT", "ADMIN"],
  },
  consulteeData: {},
  consultantData: {
    isVerified: {
      type: Boolean,
      default: false,
    },
    degrees: [
      {
        name: String,
        institute: String,
        certificate: String,
      },
    ],
  },
  adminData: {},
  mobileNumber: String,
  address: String,
  city: String,
  country: String,
  image: String,
});

export default mongoose.models?.User ?? mongoose.model("User", userSchema);
