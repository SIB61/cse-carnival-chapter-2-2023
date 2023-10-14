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
import { useForm } from "react-hook-form";

export default function () {
  const { register, handleSubmit, formState, watch } = useForm();
  const { toast } = useToast();
  const signUp = async (value) => {
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
                {...register("password", { required: true })}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                placeholder="confirm password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
              />
            </div>
            <Button disabled={!formState.isValid}>Sign up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
