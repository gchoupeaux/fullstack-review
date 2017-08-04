const express = require('express');
const helpers = require('./../helpers/github.js');
const database = require('../database/index.js');
var cool = require('cool-ascii-faces');
let app = express();

app.set('port', (process.env.PORT || 1128));

app.use(express.static(__dirname + '/../client/dist/'));

app.post('/repos', function (req, res) {
  //console.log('POST received!');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  req.on('data', (chunk) => {
    var body = '';
    var username = '';
    body += chunk;
    username = body.slice('username='.length);
    console.log('POST received: ', username);


    helpers.getReposByUsername(username);
    // helpers.getReposByUsername(function(err, username){

    // });



    res.statusCode = 200;
    res.end(JSON.stringify(username));
  });


});

app.get('/repos', function (req, res) {
  console.log('GET received!');
  // TODO - your code here!
  database.read(function(data){
    //console.log('GET func: ', data);
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  });
  
  // This route should send back the top 25 repos
  
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

//let port = process.env.PORT || 1128; //`http://localhost:${port}`


app.listen(app.get('port'), function(err) {
  if (err) throw err;
  //console.log(`listening on port ${port}`);
});

