var express=require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

const download=require('../services/file-download')
/*
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

router.get('/',getInfo, function(req,res){
	console.log('in root');
	console.log('req.info='+JSON.stringify(req.info))
	console.log('req.query='+JSON.stringify(req.query))

res.render('index',{details:JSON.stringify(req.info)});
//res.send(req.info)
});
*/
router.get('/',download.listObj,download.metaData,function(req,res){
	console.log('in download'+'req.items=='
		+JSON.stringify(req.items))
	req.items.sort(dynamicSort('id'))
	//res.json(req.items)
	res.render('index',{details:JSON.stringify(req.items)});
})


router.get('/cart', function(req,res){
	console.log('in root cart');
res.render('shopcart');
});

router.get('/checkout_form', function(req,res){
	res.render('checkout')
})

router.post('/checkout_result',function(req,res){
	console.log('in checkout')
	console.log('req.body=='+JSON.stringify(req.body))
	var obj=Object.assign({},req.body)
	console.log('obj====='+obj.username)
	res.cookie('response-cookie', req.body, { maxAge: 900000, httpOnly: true });
	res.send(req.body)
})

//////////////////////////////////
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
/////////////////////////////////
module.exports = router;