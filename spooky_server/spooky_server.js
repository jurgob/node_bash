/*
install: 

  npm install

run:

  npm start

try it: 
  http://localhost:3000/ -> error
  http://localhost:3000/sites/ -> site list
  
  http://localhost:3000/sites/google/ -> site details
  http://localhost:3000/sites/google/scrap  -> det data from site
  http://localhost:3000/sites/yahoo/
  http://localhost:3000/sites/yahoo/scrap  

*/

var SpookyProcess = require('./spooky_module');
var express = require('express');
var app = express();


var SITES = {
	'google':{
		url: 'https://www.google.co.uk', 
		desc: 'google is a search engine'
	}, 
	'yahoo':{
		url: 'https://uk.yahoo.com', 
		desc: 'yahoo is a search engine'
	}
}

var errorFunc = function(msg){
	return {'status': 'error', 'message': msg||''}
} 

app.get('/', function(req, res){
  var msg = "root path access not allowed"	
  res.json(errorFunc(msg));
});

app.get('/sites', function(req, res){
  res.json(SITES);
});

app.get('/sites/:site', function(req, res){
  res.json(SITES[req.params.site]||errorFunc('site unknown'));
});

app.get('/sites/:site/scrap', function(req, res){
	var site_info = SITES[req.params.site] 
	var _scrapScript = function(spooky){
		spooky.start(site_info.url, function() {
	        this.emit('get_title', this.getTitle())
	    });    
	    spooky.run()
	}
	var _scrapListen = function(spooky, def_listeners){
		var _res = res;
		def_listeners(spooky);
		spooky.on('get_title', function (title) {
            _res.json({
            	title: title
            });
    	});
	}
	new SpookyProcess(_scrapScript, _scrapListen)
});

app.listen(3000);



