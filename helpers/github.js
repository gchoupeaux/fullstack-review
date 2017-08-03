const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  //console.log('getReposByUsername: ', username);
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  
  // request('https://api.github.com/users/gchoupeaux/repos', function (error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred 
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //   console.log('body:', body); // Print the HTML for the Google homepage. 
  // });

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred 
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    //console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage. 
    if (body){
      database.save(JSON.parse(body))
    }

  });

}

module.exports.getReposByUsername = getReposByUsername;