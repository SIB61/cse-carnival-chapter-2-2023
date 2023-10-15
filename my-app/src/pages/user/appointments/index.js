import UserAppointmentSection from "@/components/UserAppointment";
import { getAppointmentsByPatient } from "@/lib/service/appointment";
import { useEffect } from "react";

export async function getServerSideProps({ req, res }) {
  const data = await getAppointmentsByPatient(req, res);
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function ConsultantDashBoard({ data }) {
  useEffect(() => {
    console.log(data.appointments);
  }, []);
  return (
    <div className="flex flex-col p-8 gap-4">
      <div>Appointments</div>
      <div className="flex flex-wrap gap-6">
        {data.appointments.map((appointment) => {
          return <UserAppointmentSection appointment={appointment} />;
        })}
      </div>
    </div>
  );
}
