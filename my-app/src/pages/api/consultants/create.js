import { parseForm } from "@/helpers/helpers";
import user from "@/models/user";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const { fields, files } = await parseForm(req);
      console.log(fields.name, fields, files);
      const consultant = {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        role: "CONSULTANT",
        consultantData: {
          degrees: [
            {
              name: fields.degree,
            },
          ],
        },
      };
      res.json({});
      break;

    default:
      res.status(400);
      res.send();
  }
};
