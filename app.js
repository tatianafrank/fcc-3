var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var ejs = require('ejs');
var moment = require('moment');

app.listen(port, function(){
	console.log('listenningon port:' + port);
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/:time', function(req, res){
	var time = req.params.time;
	var date;
	if(/^\d{8,}$/.test(time)) {
	    date = moment(time, "X");
	  } else {
	    date = moment(time, "MMMM D, YYYY");
	  }

	  if(date.isValid()) {
	    res.json({
	      unix: date.format("X"),
	      natural: date.format("MMMM D, YYYY")
	    });
	  } else {
	    res.json({
	      unix: null,
	      natural: null
	    });
  	}
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');