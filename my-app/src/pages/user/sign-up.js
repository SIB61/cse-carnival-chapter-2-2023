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
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserSignUp({}) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm();
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
            <Input placeholder="Name" {...register("name")} />
            <Input placeholder="Email" {...register("email")} />
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                validate: (value) => value === watch("password"),
              })}
            />
            <Button className="mt-4">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Please wait" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
