import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { fields } from "@/lib/constants/depts";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm();
  const { toast } = useToast();
  const router = useRouter();
  const signUp = async (value) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(value).forEach((k) => {
      if (k == "certificates") {
        formData.append(k, value[k][0]);
      } else {
        formData.append(k, value[k]);
      }
    });
    try {
      await axios.post("/api/consultants/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Successfully registered",
        description: "You will get an confirmation email soon.",
      });
    } catch (err) {
      toast({
        title: "Registration failed",
        description: "You will get an confirmation email soon.",
      });
      console.log(err);
    }
    setIsLoading(false);
    router.push(`/sign-in`);
  };

  return (
    <div className="w-full flex  justify-center bg-blue-300 items-center p-4">
      <Card className="w-96 p-4 shadow-md">
        <CardHeader>
          <CardTitle>MedPoint</CardTitle>
          <CardDescription>Sign up as a consultant</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(signUp)}
          >
            <div>
              <Label>Name</Label>
              <Input
                id="name"
                placeholder="name"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                placeholder="email"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className=" h-40 w-max">
                    <SelectGroup>
                      <SelectLabel>Domain</SelectLabel>
                      {Object.keys(fields).map((field) => (
                        <SelectItem value={field}>
                          {fields[field].title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Degree</Label>
              <Input
                placeholder="degree"
                {...register("degree", { required: true })}
              />
            </div>

            <div>
              <Label>Institution</Label>
              <Input
                placeholder="institution"
                {...register("institution", { required: true })}
              />
            </div>

            <div>
              <Label>Certificates</Label>
              <Input
                type="file"
                multiple
                accept={"application/pdf"}
                {...register("certificates", { required: true })}
              />
            </div>

            <div>
              <Label>Registration/Liscence no.</Label>
              <Input
                placeholder="registration/license no."
                {...register("registrationNumber", { required: true })}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                placeholder="password"
                type="password"
                {...register("password", { required: true })}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                placeholder="confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
              />
            </div>
            <Button disabled={!formState.isValid}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Please wait" : "Sign Up"}
            </Button>
            <div className="self-center">
              <Link
                href={"/user/sign-up"}
                className=" cursor-pointer text-blue-500 underline"
              >
                Sign Up as a User
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
