const aws = require('aws-sdk')
require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: 'eu-west-1'  
})

const s3 = new aws.S3({apiVersion: '2006-03-01'});

//const metaData = s3.headObject(params);
//console.log('metaData=='+metaData[0])
var metaData=(req,res,next)=>{
  console.log('req.id.size==='+req.id.length)
  req.items=[]
  
    const callback= function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            
            req.meta={}
            //req.meta.src='https://ericcalder-data.s3.eu-west-2.amazonaws.com/'
            //+req.id[0]
            console.log('i======'+i+'   count=='+count)
            req.meta.id=data.Metadata['id']
            req.meta.src='https://ericcalder-data.s3.eu-west-2.amazonaws.com/'
                          +data.Metadata['id']
            req.meta.name=data.Metadata['name']
            req.meta.artist=data.Metadata['artist']
            req.meta.media=data.Metadata['media']
            req.meta.size=data.Metadata['size']
            req.meta.cost=data.Metadata['cost']
            req.items.push(req.meta)
          console.log('req.items===='+JSON.stringify(req.items))
          
        if(count==req.id.length-1){next()}
          count++
        //next()
    
          }//else 
    };//callback
 for(var i=0;i<req.id.length;i++){
 var params = {
    Bucket: 'ericcalder-data',
    Key: req.id[i] } 
    var count=0;
    console.log('count=='+count)
  //  s3.waitFor('objectExists',params,callback)
  s3.headObject(params,callback)
 }//for
 //next()

}//metaData


const listObj=(req,res,next)=>{
var bucketParams={Bucket:'ericcalder-data'}
    s3.listObjects(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
//    console.log("Success", Object.keys(data.Contents[0]));
    console.log("Success # items=", data.Contents.length);
  
    req.id=[]
    for(var i=0;i<data.Contents.length;i++){
        req.id.push(data.Contents[i].Key)
        }//for
        console.log('id list=='+req.id)
    next()
  }
});//s3
}

//module.exports=list
module.exports= {
                  metaData,
                  listObj
                  }
