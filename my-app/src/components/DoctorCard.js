import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function DoctorCard({ consultant }) {
  return (
    <Card className="w-96 p-6 shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold leading-none tracking-tight">
              {consultant.name}
            </div>
            <div>{consultant.consultantData.category}</div>
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </div>
        <Button asChild>
          <Link href={`/consultant/${consultant._id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}
