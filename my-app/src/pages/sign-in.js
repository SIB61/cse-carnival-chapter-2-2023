import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function () {
  const { formState, register, handleSubmit } = useForm();
  const { status, data: session } = useSession();
  const router = useRouter();
  const login = async (data) => {
    await signIn("credentials", data);
  };

  console.log(session);
  useEffect(() => {
    if (status === "authenticated") {
      switch (session.user?.role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "CONSULTANT":
          router.push("/consultant");
          break;
        case "CONSULTEE":
          router.push("/");
          break;
      }
    }
  }, [session?.user, session]);

  return (
    <div className=" bg-blue-300 h-screen w-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>MedPoint</CardTitle>
          <CardDescription>Sign in to MedPoint</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <Input
                {...register("email", { required: true })}
                placeholder="enter your email"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                placeholder="enter your password"
                {...register("password", { required: true })}
              />
            </div>

            <Button disabled={!formState.isValid}>Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
