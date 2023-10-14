import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    consultee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: "String",
      enum: ["APPROVED", "PENDING", "DECLINED"],
      default: "PENDING",
    },
    appointmentDate: Date,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.models?.Appointment ??
  mongoose.model("Appointment", appointmentSchema);
