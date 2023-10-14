import { parseForm } from "@/helpers/helpers";
import connectDb from "@/lib/db/connect";
import user from "@/models/user";
import { hashSync } from "bcrypt";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const { fields, files } = await parseForm(req);

      const certificate = files.certificates
        ? "http://localhost:3000/uploads/" + files.certificates?.newFilename
        : undefined;

      const consultant = {
        name: fields.name,
        email: fields.email,
        password: hashSync(fields.password, 10),
        role: "CONSULTANT",
        consultantData: {
          registrationNumber: fields.registrationNumber,
          degrees: [
            {
              name: fields.degree,
              certificate: certificate,
              institution: fields.institution,
            },
          ],
        },
      };

      connectDb();
      await user.create(consultant);
      res.json({});

      break;

    default:
      res.status(400);
      res.send();
  }
};
