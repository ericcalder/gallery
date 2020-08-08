const aws = require('aws-sdk')
require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3')
 
aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: 'eu-west-1'  
})
const s3 = new aws.S3()
var unique_key=Date.now().toString()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ericcalder-data',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      //cb(null, {fieldName: 'TESTing META_DATA'});
      var obj=Object.assign({}, req.body)
          obj.id=unique_key
      cb(null, obj);
    },
    key: function (req, file, cb) {
      cb(null, unique_key)
    }//cb
  })//storage

})//multer
 
 module.exports =  upload;