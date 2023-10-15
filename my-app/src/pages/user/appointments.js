import PatientCard from "@/components/PatientCard";
import { getAppointments } from "@/lib/service/appointment";
import { useEffect } from "react";

export async function getServerSideProps({ req, res }) {
  const data = await getAppointments(req, res);
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function ConsultantDashBoard({ data }) {
  useEffect(() => {
    console.log(data.appointments);
  }, []);
  return (
    <div className="flex flex-col p-4 gap-4">
      <div>Appointments</div>
      {data.appointments.map((appointment) => {
        return <PatientCard appointment={appointment} />;
      })}
    </div>
  );
}
