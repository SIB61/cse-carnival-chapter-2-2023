import path from "path";
import { IncomingForm } from "formidable";
//  const FormidableError = formidable.errors?.FormidableError;
export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      Object.keys(fields).forEach((k) => {
        fields[k] = fields[k][0];
      });

      Object.keys(files).forEach((k) => {
        files[k] = files[k][0];
      });

      resolve({ fields, files });
    });
  });
};
