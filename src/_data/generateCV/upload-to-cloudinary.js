const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadFromBuffer = (bufferFile, format) => {
  cloudinary.config({
    cloud_name: "drl7fvvng",
    api_key: "868377652615448",
    api_secret: "OPQfuO6vVJ-m9S8W-inJWsfZ5lI",
    secure: true,
  });

  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        filename_override: `cv-${format}-ivan-rodrigues-${Date.now().toString()}`,
        use_filename: true,
        resource_type: "raw",
        format,
        folder: "Curriculum Vitae",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(bufferFile).pipe(cld_upload_stream);
  });
};

module.exports = {
  uploadFromBuffer,
};
