import AppointmentInfo from "@/components/AppointmentInfo";
import { getAppointment } from "@/lib/service/appointment";

export async function getServerSideProps({ query }) {
  const data = await getAppointment(query.id);
  console.log(data);
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function AppointmentPage({ data }) {
  return (
    <div className="flex justify-center items-center p-4">
      <AppointmentInfo appointment={data} />
    </div>
  );
}
