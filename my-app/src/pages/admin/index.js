import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import user from "@/models/user";
import { AiOutlineCheck, AiOutlineDownload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import connectDb from "@/lib/db/connect";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function TableDemo({ consultants }) {
  const [cArr, setCArr] = useState(consultants);
  const approveConsultant = async (id) => {
    try {
      await axios.patch(`/api/consultants/${id}/approve`, {});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-10">
      <Card>
        <CardHeader>
          <CardTitle>Consultants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Consultants.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>BMDC No.</TableHead>
                <TableHead>Certificates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cArr.map((c) => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    {!c.consultantData.isVerified ? (
                      <span className="flex gap-2">
                        Pending
                        <Button
                          variant="ghost"
                          className="rounded-full"
                          size="icon"
                        >
                          <AiOutlineCheck />
                        </Button>
                      </span>
                    ) : (
                      "Verified"
                    )}
                  </TableCell>
                  <TableCell>{c.consultantData.degrees[0]?.name}</TableCell>
                  <TableCell>
                    {c.consultantData.degrees[0]?.institution}
                  </TableCell>
                  <TableCell>
                    {c.consultantData.degrees[0]?.registrationNumber}
                  </TableCell>
                  <TableCell>
                    <a
                      href={c.consultantData.degrees[0]?.certificate}
                      download={"file"}
                    >
                      <Button size="icon" variant="outline">
                        <AiOutlineDownload />
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell>
                    {!c.consultantData.isVerified && (
                      <Button onClick={() => approveConsultant(c._id)}>
                        verify
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  await connectDb();
  const consultants = await user
    .find({ role: "CONSULTANT" })
    .select("-password")
    .lean();

  console.log(consultants);

  return { props: JSON.parse(JSON.stringify({ consultants })) };
}
