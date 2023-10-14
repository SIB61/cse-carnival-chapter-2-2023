import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";

export default function AppointmentSection({}) {
  return (
    <div className="flex flex-col gap-10">
      <div className=" font-semibold">Schedule Appointment</div>
      <Card>
        <Calendar></Calendar>
      </Card>
      <Button variant="">Book Appointment</Button>
    </div>
  );
}
