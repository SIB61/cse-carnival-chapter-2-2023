import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/router";

export default function AppointmentInfo({ appointment }) {
  const [date, setDate] = useState(new Date(appointment.appointmentDate));
  const [time, setTime] = useState("");
  const router = useRouter();

  const acceptRequest = async () => {
    const { id } = router.query;
    const requestBody = { time, status: "APPROVED" };
    const response = await axios.put(
      `/api/consultants/appointment/${id}`,
      requestBody
    );
    if (response.status === 200) {
      console.log(response);
    }
  };
  const declineRequest = async () => {
    const { id } = router.query;
    const requestBody = { status: "DECLINED" };
    const response = await axios.put(
      `/api/consultants/appointment/${id}`,
      requestBody
    );
    if (response.status === 200) {
      console.log(response);
    }
  };
  return (
    <div className="flex flex-col gap-5 p-4 max-w-xl">
      <div className="flex gap-[30px] items-center">
        <div>
          {appointment.consultee.image ? (
            <img
              className="w-[150px] h-[160px] rounded-md overflow-hidden"
              src={appointment.consultee.image}
            />
          ) : (
            <img
              className="w-[180px] h-[186px] rounded-md overflow-hidden"
              src="https://us.123rf.com/450wm/kakigori/kakigori1901/kakigori190100055/116212835-young-sad-man-patient-resting-in-hospital-bed-isolated-on-white.jpg?ver=6"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xl">{appointment.consultee.name}</div>
          <div className="font-semibold text-lg">
            {appointment.consultee.dateOfBirth}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">Note</div>
        <div>{appointment.note}</div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="font-semibold self-start">Appointed Date</div>
        <Calendar mode="single" selected={date} className="rounded-md border" />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="font-semibold self-start">Appointed Date</div>
        <Input
          className="w-40"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></Input>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <Button onClick={acceptRequest} disabled={!time}>
          Accept Appointment Request
        </Button>
        <Button onClick={declineRequest}>Decline Appointment Request</Button>
      </div>
    </div>
  );
}
