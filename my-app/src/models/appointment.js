import mongoose from "mongoose";
import user from "./user";

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
    time: String,
    appointmentDate: Date,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.models?.appointment ??
  mongoose.model("appointment", appointmentSchema);
