import AppointmentSection from "@/components/AppointmentSection";
import DoctorInfo from "@/components/DoctorInfo";
import { getConsultantFromDB } from "@/lib/service/consultant";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = (await getConsultantFromDB(context.query.id)) || {};
  return { props: { data: JSON.parse(JSON.stringify(data)) } };
}

export default function ConsultantProfile({ data }) {
  return (
    <div className=" w-full h-screen flex justify-center items-center pt-10 gap-12">
      <DoctorInfo consultant={data.consultant} />
      <div className="w-[1px] h-[500px] bg-[#777]"></div>
      <AppointmentSection />
    </div>
  );
}
