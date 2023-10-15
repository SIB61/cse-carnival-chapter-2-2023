import AppointmentInfo from "@/components/AppointmentInfo";
import UserAppointmentInfo from "@/components/UserAppointmentInfo";
import { getAppointmentByPatient } from "@/lib/service/appointment";

export async function getServerSideProps({ query }) {
  const data = await getAppointmentByPatient(query.id);
  console.log(data);
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function AppointmentPage({ data }) {
  return (
    <div className="flex justify-center items-center p-4">
      <UserAppointmentInfo appointment={data} />
    </div>
  );
}
