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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function () {
  const { formState, register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter();
  const login = async (data) => {
    setIsLoading(true);
    await signIn("credentials", data);
    setIsLoading(false);
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
          router.push("/user");
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
                type="password"
                {...register("password", { required: true })}
              />
            </div>

            <Button disabled={!formState.isValid}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Please wait" : "Sign In"}
            </Button>
            <div className="self-center">
              Not Registered?{" "}
              <Link
                href={"/user/sign-up"}
                className=" cursor-pointer text-blue-500 underline"
              >
                Sign up
              </Link>{" "}
              here
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
