import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UserAppointmentInfo({ appointment }) {
  const [date, setDate] = useState(new Date(appointment.appointmentDate));
  const [time, setTime] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 p-4 max-w-xl">
      <div className="flex gap-[30px] items-center">
        <div>
          {appointment.consultant.image ? (
            <img
              className="w-[150px] h-[160px] rounded-md overflow-hidden"
              src={appointment.consultant.image}
            />
          ) : (
            <img
              className="w-[180px] h-[186px] rounded-md overflow-hidden"
              src="https://us.123rf.com/450wm/kakigori/kakigori1901/kakigori190100055/116212835-young-sad-man-patient-resting-in-hospital-bed-isolated-on-white.jpg?ver=6"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">{appointment.consultant.name}</div>
          <div className="font-semibold text-lg">
            {appointment.consultant.dateOfBirth}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">Note</div>
        <div>{appointment.note}</div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="font-semibold">Appointed Date</div>
        <Calendar mode="single" selected={date} className="rounded-md border" />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="font-semibold">Appointed Time</div>
        {appointment.status === "PENDING" ? (
          <Button disabled>
            The time will appear here when the doctor accepts your request
          </Button>
        ) : (
          <Button disabled>{appointment.time}</Button>
        )}
      </div>
      <div className="flex gap-5 items-center justify-center">
        {appointment.status === "PENDING" ? (
          <></>
        ) : (
          <>
            <Button asChild>
              <Link href={`/chat?id=${appointment.consultant._id}`}>
                Start Chatting
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
