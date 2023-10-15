import DoctorInfo from "@/components/DoctorInfo";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return (
    <div className="flex h-screen w-full justify-center items-center">
      {session.status === "authenticated" && (
        <DoctorInfo consultant={session?.data?.user} />
      )}
    </div>
  );
}
