const chalk = require("chalk");
const { generateDocx } = require("./generate-docx");
const { uploadFromBuffer } = require("./upload-to-cloudinary");
const { convertDocxToPDF } = require("./convert-docx-to-pdf");
const { prepareData } = require("./prepare-data");

const cvPromise = new Promise((resolve, reject) => {
  const asyncGenerateCV = async () => {
    const data = await prepareData();

    console.log(chalk.yellow("Data: \n"));
    console.log(data);
    console.log(chalk.yellow("End of dumped data: \n\n\n"));

    const docxBuffer = generateDocx(data);

    let urls = {};

    if (docxBuffer) {
      uploadFromBuffer(docxBuffer, "docx")
        .then((response) => {
          console.log(
            chalk.green("Docx succesfully generated ✓ ") +
              response.secure_url +
              "\n",
          );

          urls = {
            ...urls,
            docxURL: response.secure_url,
          };
        })
        .catch((error) => console.log("Something went wrong:", error));

      convertDocxToPDF(docxBuffer)
        .then((pdfBuffer) => {
          uploadFromBuffer(pdfBuffer, "pdf")
            .then((response) => {
              console.log(
                chalk.green("PDF succesfully generated ✓ ") + response.secure_url,
              );

              urls = {
                ...urls,
                pdfURL: response.secure_url,
              };

              // console.log(urls);
              resolve(urls);
            })
            .catch((error) => {
              reject("Something went wrong:", error);
            });
        })
        .catch((error) => reject("Error converting file: " + error));
    }
  };

  asyncGenerateCV();
});

const generateCV = async () => {
  const cvLinks = await cvPromise;
  return cvLinks;
};

module.exports = generateCV;
