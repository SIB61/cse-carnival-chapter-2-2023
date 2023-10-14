import mongoose from "mongoose";
import appointment from "./appointment";

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
    category: String,
    registrationNumber: String,
    degrees: [
      {
        name: String,
        institution: String,
        certificate: String,
      },
    ],
  },
  adminData: {},
  gender: String,
  dateOfBirth: Date,
  mobileNumber: String,
  address: String,
  city: String,
  country: String,
  image: String,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
    },
  ],
});

export default mongoose.models?.user ?? mongoose.model("user", userSchema);
