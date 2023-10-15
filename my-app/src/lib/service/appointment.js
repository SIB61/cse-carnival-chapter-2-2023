import appointment from "@/models/appointment";
import { createOptions } from "@/pages/api/auth/[...nextauth]";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import connectDb from "../db/connect";
import user from "@/models/user";

const requestAppointment = async (req, res) => {
  await connectDb();
  const session = await getServerSession(req, res, createOptions(req));
  console.log(session);
  const appointmentData = req.body;
  appointmentData.consultee = session.user._id;
  const { __v, ...createdAppointment } = await appointment
    .create(appointmentData)
    .then((obj) => obj.toObject());
  const result = await user.updateMany(
    {
      $or: [
        { _id: appointmentData.consultant },
        { _id: appointmentData.consultee },
      ],
    },
    {
      $push: { appointments: createdAppointment._id },
    }
  );
  return res.status(201).json(createdAppointment);
};

const getAppointments = async (req, res) => {
  await connectDb();
  const session = await getServerSession(req, res, createOptions(req));
  console.log(session);
  const appointments = await user
    .findById(session.user._id)
    .populate({
      path: "appointments",
      select: {
        appointmentDate: 1,
        note: 1,
        status: 1,
      },
      populate: {
        path: "consultee",
        select: {
          image: 1,
          name: 1,
          dateOfBirth: 1,
        },
      },
    })
    .select("appointments -_id")
    .lean();
  return appointments;
};

const getAppointment = async (id) => {
  await connectDb();
  const data = await appointment
    .findById(id)
    .populate({
      path: "consultee",
      select: {
        image: 1,
        name: 1,
        dateOfBirth: 1,
      },
    })
    .select("appointmentDate consultee note status -_id")
    .lean();
  return data;
};

const updateAppointment = async (id, status, time) => {
  await connectDb();
  const updateData = {};
  if (time) {
    updateData.time = time;
  }
  updateData.status = status;
  const data = await appointment
    .findByIdAndUpdate(id, updateData, { new: true })
    .populate({
      path: "consultee",
      select: {
        image: 1,
        name: 1,
        dateOfBirth: 1,
      },
    })
    .select("appointmentDate consultee note status -_id")
    .lean();
  return data;
};

export {
  requestAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
};
