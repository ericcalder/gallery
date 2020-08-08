
var express=require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var gallery = require('./routes/gallery');
var upload = require('./routes/upload');

require('dotenv').config()
const port = process.env.PORT || 3000

var app = express();

//var index = require('./routes/index');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////////
//////////////
app.get('/',function(req,res,next){
	console.log('in home')
	res.render('home')
})


app.use('/gallery',gallery);
app.use('/upload',upload);
//app.use('/download',download);

app.listen(port);