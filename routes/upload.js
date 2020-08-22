var express=require('express');
var router = express.Router();
const multer = require('multer')
const upload=require('../services/file-upload')
var singleUpload=upload.single('image')




router.get('/',function(req,res){
console.log('in image-upload get')
res.render('upload',{title:'upload'})	
})

router.post('/',singleUpload, function(req,res){
//console.log('in image-upload')
singleUpload(req,res,function(err){
	console.log('req.file=='+JSON.stringify(req.file))

	return res.json({'imageUrl': req.file.location,
   'imageName':req.file.originalname})
})//singleUpload
})//post
/*
const uploadTest=multer({ dest: './public/images/uploads' })
var cpUpload = uploadTest.fields([{ name: 'myFile', maxCount: 1 }, 
                                { name: 'artist', maxCount: 1 }])


router.get('/test',function(req,res){
	res.render('test',{title: 'test',file:''})
})

router.post('/test', uploadTest.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log('req.body=='+JSON.stringify(req.body))
  res.cookie('cookiename', req.file, { maxAge: 900000, httpOnly: false });
    res.json(file+'   body=='+JSON.stringify(req.body))
    //res.render('test',{file:JSON.stringify(file),title:'test'})
  
})
*/

module.exports = router;