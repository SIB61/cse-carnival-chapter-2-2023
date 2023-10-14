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
import { useForm } from "react-hook-form";

export default function UserSignUp({}) {
  const { register, handleSubmit, watch } = useForm();

  const signUp = async (data) => {
    const { confirmPassword, ...userData } = data;
    console.log(userData);
    const response = await axios.post(
      `http://localhost:3000/api/users/`,
      userData
    );
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
            <Button className="mt-4">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
