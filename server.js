var http = require('http');
var ramrod = require('ramrod');
var request = require('request');
var ecstatic = require('ecstatic');
var path = require('path');
var decorator = require('./decorator');

var ec = ecstatic( path.resolve(__dirname) );

var router = ramrod();

router.add('', function(req, res){
  res.template('index.ejs', {});
});


router.add('favicon.ico', function(req, res){
  req.url = '/assets/favicon.ico';
  ec(req, res);
});

router.add(':username', function(req, res, username){

  if( !username ){
    res.template('index.ejs', {});
    return;
  }

  request('https://coderwall.com/'+ username +'.json', function(err, response, body){
    if( err ){
      console.log(err);
      res.error(500);
    }
    var data;
    try{ data = JSON.parse(body); } catch(e){
      return res.error(500);
    }
    if( data.accounts && data.accounts.github ){
      data.profile_url = "https://github.com/"+ data.accounts.github;
    } else if(data.accounts && data.accounts.twitter){
      data.profile_url = "https://twitter.com/"+ data.accounts.twitter;
    } else {
      data.profile_url = false;
    }
    res.template('profile.ejs', data);
  });
});

router.add('assets/*path', ec);

router.on('*', function(req, res){
  res.error(404);
});

var server = http.createServer(function(req, res){
  decorator(req, res);
  router.dispatch(req, res);
});

server.listen(3000, function(){
  console.log('server listenting on port 3000');
});

