const express = require('express');
const helpers = require('./../helpers/github.js');
const database = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

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




    res.statusCode = 200;
    res.end(JSON.stringify(username));
  });


});

app.get('/repos', function (req, res) {
  console.log('GET received!');
  // TODO - your code here!
  database.read(function(data){
    console.log('GET func: ', data);
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  });
  
  // This route should send back the top 25 repos
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

