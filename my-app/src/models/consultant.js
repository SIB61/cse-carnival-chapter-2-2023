import mongoose from "mongoose";

const consultantSchema = new mongoose.Schema({
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
});

export default mongoose.models?.Consultant ??
  mongoose.model("Consultant", consultantSchema);
