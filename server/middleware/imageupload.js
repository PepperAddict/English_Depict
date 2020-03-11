const express = require("express");
const router = express.Router();

require("dotenv").config();
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require('path');
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  Bucket: "t-cloud-bucket", // bucket name
  region: "us-east-1"
});

const profileImgUpload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "t-cloud-bucket",
      acl: "public-read",
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        cb(
          null,
          path.basename(
            req.headers.username +
              Date.now().toString() +
              path.extname(file.originalname)
          )
        ); //giving it a unique name
      }
    }),
  
    fileFilter: function(req, file, cb) {
      const filetypes = /jpeg|jpg|png|svg|gif/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });
  
  router.post(
    "/upload",
    profileImgUpload.single("depictImage"),
    (req, res, next) => {
      if (req.file === undefined) {
        return res.status(400).json({
          msg: "Image only"
        });
      } else if (req.file === null) {
        return res.status(400).json({
          msg: "No file was uploaded"
        });
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        res.json({
          image: imageName,
          location: imageLocation
        });
        let oldImage = req.headers.oldimage.split("/");
        let oldimagepath = oldImage[oldImage.length - 1];
        if (oldImage) {
          let params = { Bucket: "t-cloud-bucket", Key: oldimagepath };
          s3.deleteObject(params, function(err, data) {
            if (err) console.log(err);
            else console.log(data);
          });
        }
      }
    }
  );

  module.exports = router;