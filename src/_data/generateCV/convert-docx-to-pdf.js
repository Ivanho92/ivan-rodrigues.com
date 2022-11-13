const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const convertDocxToPDF = async (docxBuffer) => {
  // console.log("Start docxBuffer => " + docxBuffer + "<= End docxBuffer");

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  const pdfBuffer = await libre.convertAsync(docxBuffer, ".pdf", undefined);
  return pdfBuffer;
};

module.exports = {
  convertDocxToPDF,
};
