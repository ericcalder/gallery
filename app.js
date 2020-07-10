
var express=require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
const mysql=require('mysql');
var gallery = require('./routes/gallery');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'stairadmin',
      password: 'ericpass',
      database: 'artwork',
      timezone: 'utc'
    });

connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
});

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


app.listen(3000);