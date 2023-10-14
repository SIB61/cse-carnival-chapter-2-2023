import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { AiOutlineLogout } from "react-icons/ai";

export const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Button
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
        variant="outline"
        size="icon"
        className="fixed top-4 right-4"
      >
        <AiOutlineLogout />
      </Button>
    </>
  );
};
