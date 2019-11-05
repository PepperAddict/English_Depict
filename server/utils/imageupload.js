module.exports = (express) => {


// const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const url = require('url')
const multerS3 = require('multer-s3')
const multer = require('multer')
const AWS = require('aws-sdk')

const router = express.Router();

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  Bucket: 'english-practice',
  region: 'us-east-1'
})

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3, 
    bucket: 'english-practice',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb) {

      cb(null, path.basename(file.originalname + Date.now().toString() + path.extname(file.originalname)));
    }
  }), 
  limits: {fileSize: 2000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('depictImage')

function checkFileType( file, cb) {
  const filetypes = /jpeg|jpg|png|svg|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

router.route('/upload')
  .post((req, res, err, next) => {
    res.send('success')
  // profileImgUpload( req, res, (error) => {
  //   if (error) {
  //     console.log( 'errors', error);
  //     res.json( { error: error})
  //   } else {
  //     console.log(req.file)
  //     if (req.file === undefined) {
  //       console.log('Error: No File Selected!');
  //       res.json( 'Error: No File Selected');
  //     }else if(req.files === null) {
  //       return res.status(400).json({
  //         msg: 'No file was uploaded'
  //       })
  //     } else {
  //       console.log('what')
  //       const imageName = req.file.key; 
  //       const imageLocation = req.file.location; 
  //       res.json( {
  //         image: imageName, 
  //         location: imageLocation
  //       })
  //     }
  //   }
  // })
  // if (req.files === null) {
  //   return res.status(400).json({
  //     msg: 'No file was uploaded'
  //   })
  // }
  // const file = req.files.file;
  // file.mv(`${path.resolve(__dirname, "../public/uploads/" + file.name)}`, err => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send(err);
  //   }
  //   const fileTypes = /jpeg|jpg|png|gif|wpeg|svg/;
  //   //check it 
  //   const extName = fileTypes.test(path.extname(file.name).toLowerCase());
  //   //check mime 
  //   const mimetype = fileTypes.test(file.mimetype)
  //   let newFileName = Date.now() + path.extname(file.name).toLowerCase();
  //   //check extension first
  //   if (mimetype && extName) {
  //     res.json({ fileName: newFileName, filePath: `${path.resolve(__dirname, "../public/uploads/")}`})
  //   } else {
  //     console.log('no worky')
  //     return res.status(400).json({
  //       msg: 'Images Only'
  //     })
  //   }
    
  // });
})
return router;
}