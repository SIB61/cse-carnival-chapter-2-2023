import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect } from "react";

export default function UserAppointmentSection({ appointment }) {
  return (
    <Card className="w-96 p-6 shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            {appointment.consultant.image ? (
              <img
                src={appointment.consultant.image}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold leading-none tracking-tight">
              {appointment.consultant.name}
            </div>
            <div> {appointment.consultant.dateOfBirth}</div>
          </div>
        </div>
        <div>{appointment.note}</div>
        <Button asChild>
          <Link href={`/user/appointments/${appointment._id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </Card>
  );
}
