
var express=require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
const mysql=require('mysql');

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

const getInfo=(req,res,next)=>{
	var sql='SELECT * FROM images'

	connection.query(sql, (err,rows) => {
        if(err) throw err;
          //console.log('Data saved to payments:\n');
            console.log('the variable result====',JSON.stringify(rows));
            req.info=rows
            next()

    });////connection	
	
}

app.get('/',getInfo, function(req,res){
	console.log('in root');
	console.log('req.info='+JSON.stringify(req.info))
	console.log('req.query='+JSON.stringify(req.query))
res.render('index',{details:JSON.stringify(req.info)});
//res.send(req.info)
});

app.get('/cart', function(req,res){
	console.log('in root cart');
res.render('shopcart');
});

app.get('/checkout_form', function(req,res){
	res.render('checkout')
})

app.post('/checkout_result',function(req,res){
	console.log('in checkout')
	console.log('req.body=='+JSON.stringify(req.body))
	res.send(req.body)
})




app.listen(3000);