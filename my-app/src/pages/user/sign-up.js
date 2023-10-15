import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserSignUp({}) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm();
  const router = useRouter();

  const signUp = async (data) => {
    const { confirmPassword, ...userData } = data;
    setIsLoading(true);
    const response = await axios.post(`/api/users/`, userData);
    if (response.status === 201) {
      router.push("/sign-in");
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-screen bg-[#93c5fd] flex justify-center items-center">
      <Card className="w-96 p-4 shadow-md">
        <CardHeader>
          <CardTitle>MedPoint</CardTitle>
          <CardDescription>Sign up to MedPoint</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(signUp)}>
            <Input
              placeholder="Name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                validate: (value) => value === watch("password"),
              })}
            />
            <Button className="mt-4" disabled={!formState.isValid}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Please wait" : "Sign Up"}
            </Button>
            <div className="self-center">
              <Link
                href={"/consultant/sign-up"}
                className=" cursor-pointer text-blue-500 underline"
              >
                Sign Up as a Consultant
              </Link>{" "}
            </div>
            <div className="self-center">
              Already Registered?{" "}
              <Link
                href={"/sign-in"}
                className=" cursor-pointer text-blue-500 underline"
              >
                Sign In
              </Link>{" "}
              here
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
