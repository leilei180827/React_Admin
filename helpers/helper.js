const util = require("util");
const path = require("path");
const gc = require("../config/index");
// const bucket = gc.bucket("mern-admin.appspot.com"); // should be your bucket name
const bucket = gc.bucket("cloud-run-mern");

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    let rename =
      path.parse(originalname).name +
      "-" +
      Date.now() +
      path.parse(originalname).ext;

    const blob = bucket.file(rename.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
module.exports = uploadImage;
