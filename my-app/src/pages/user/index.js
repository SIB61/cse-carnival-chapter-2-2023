import DoctorCard from "@/components/DoctorCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getConsultants, getConsultantsFromDB } from "@/lib/service/consultant";
import { useEffect } from "react";

export async function getServerSideProps() {
  const data = await getConsultantsFromDB();
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function UserHomePage({ data }) {
  useEffect(() => {
    console.log(data.consultants);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-10 overflow-auto">
        <div className="text-2xl font-bold pb-4">Consultants</div>
        <div className="flex flex-wrap gap-8">
          {data.consultants.map((consultant) => (
            <DoctorCard consultant={consultant} />
          ))}
          {data.consultants.map((consultant) => (
            <DoctorCard consultant={consultant} />
          ))}
          {data.consultants.map((consultant) => (
            <DoctorCard consultant={consultant} />
          ))}
        </div>
      </div>
    </div>
  );
}
