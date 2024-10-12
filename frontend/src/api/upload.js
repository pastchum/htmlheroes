import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "uploads");
    form.keepExtensions = true;

    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      const file = files.file;
      const filePath = path.join(form.uploadDir, file.newFilename);

      fs.rename(file.filepath, filePath, (err) => {
        if (err) {
          console.error("File rename error:", err);
          return res.status(500).json({ error: "File processing failed" });
        }
        res.status(200).json({ message: "File uploaded successfully" });
      });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
