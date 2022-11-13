const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

const generateDocx = (
  data = {
    firstName: "John",
    lastName: "Doe",
    position: "Position",
  },
) => {
  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname, "./template.docx"),
    "binary",
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render(data);

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.

  // fs.writeFileSync(path.resolve(__dirname, "../output/output.docx"), buf);

  return buf;
};

module.exports = {
  generateDocx,
};
