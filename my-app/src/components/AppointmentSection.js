import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AppointmentSection({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [note, setNote] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    setIsLoading(true);
    const requestBody = {
      consultant: router.query.id,
      note,
      appointmentDate: date,
    };
    const response = await axios.post(`/api/users/appointment`, requestBody);
    if (response.status === 201) {
      setIsLoading(false);
      router.push(`/user/appointments`);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <Card className="flex flex-col items-center gap-5 p-5">
        <CardTitle>Schedule Appointment</CardTitle>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write a short note to your doctor"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></Textarea>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Requesting" : "Request An Appointment"}
          </Button>
        </form>
        {/* <Calendar></Calendar> */}
      </Card>
    </div>
  );
}
