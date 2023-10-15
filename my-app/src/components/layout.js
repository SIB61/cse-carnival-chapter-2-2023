import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/router";
import { BiHome } from "react-icons/bi";
import { AiFillWechat } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "lucide-react";

const routes = (role) => [
  {
    path: role === "CONSULTANT" ? "/consultant" : "/user",
    name: "Home",
    icon: <BiHome />,
  },

  {
    path:
      role === "CONSULTANT" ? "/consultant/appointments" : "/user/appointments",
    name: "Appointments",
    icon: <MdMeetingRoom />,
  },
  {
    path: "/chat",
    name: "Conversations",
    icon: <AiFillWechat />,
  },
];

export const Layout = ({ children }) => {
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-slate-950 h-full top-0 p-4 left-0 border-r-2 flex flex-col gap-4">
          <h1 className="text-white font-extrabold">MedPoint</h1>
          <Separator className="my-2 border-white text-white" />
          {routes(session?.data?.user?.role).map((r, k) => (
            <Button
              variant=""
              key={k}
              onClick={() => router.push(r.path)}
              className={` flex gap-2 justify-start ${
                router.pathname === r.path ? "" : "bg-transparent"
              }`}
            >
              {r.icon}
              {r.name}
            </Button>
          ))}
          <div className="flex-1 flex justify-center items-end">
            {session.status === "authenticated" && (
              <Button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                variant="outline"
                className="w-full"
              >
                <AiOutlineLogout />
                Logout
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-screen w-full">{children}</ScrollArea>
      </div>
    </>
  );
};
