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
});

export default mongoose.models?.Consultant ??
  mongoose.model("Consultant", consultantSchema);
