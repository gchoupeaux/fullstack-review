const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // schema
  id: Number,
  name: String,           //"git-consortium",
  html_url: String,       //"https://github.com/octocat/git-consortium",
  description: String,    //"This repo is for demonstration purposes only.",
  forks: Number,
  watchers: Number,
  owner: { login: String, html_url: String } //"https://github.com/octocat"
});

let Repo = mongoose.model('Repo', repoSchema);

// function delete of the line 

let save = (datas) => {
  // This function should save a repo or repos to the MongoDB
  
  var id = {};
  //console.log(data);
  
  datas.forEach((data) => {
    
    id.id = data.id;
    console.log(id);   

    //read the ID colunn of full database
    Repo.find(id,function (err, row) {
      if (err) return console.error(err);
      //console.log(row);
      // if nothing  
      if (row.length === 0){
        //console.log(data);
        var repo = new Repo({ id: data.id,
                          name: data.name,//'git-consortium',  
                          html_url: data.html_url,//'https://github.com/octocat/git-consortium',
                          description: data.description, //'This repo is for demonstration purposes only.',
                          forks: data.forks, // 24,
                          watchers: data.watchers, //7,
                          owner: { login: data.owner.login, html_url: data.owner.html_url }
                        });

        repo.save(function (err, repo) {
        if (err) return console.error(err);
          console.error('repo saved!')
        });
      }
      
      // [ { _id: 598274707bb38a26b6480f5f,
      // id: 88083499,
      // name: 'Automatic-Teller-Machine',
      // html_url: 'https://github.com/gchoupeaux/Automatic-Teller-Machine',
      // description: 'ATM Certified Labview Developer exam',
      // forks: 0,
      // watchers: 0,
      // __v: 0,
      // owner: { html_url: 'https://github.com/gchoupeaux' } } ]

    }, data)
    
    //remove from datas the allready present id 
    //mongoose.connection.db.dropCollection('foo', function(err, result) {...});
    
    //put in the database all the left 
    


      
    
  });
}

let read = (callback) => {
  

  // Person.
  // find({ occupation: /host/ }).
  // where('name.last').equals('Ghost').
  // where('age').gt(17).lt(66).
  // where('likes').in(['vaporizing', 'talking']).
  // limit(10).
  // sort('-occupation').
  // select('name occupation').
  // exec(callback);


  Repo.
  find().
  limit(25).
  sort('-watchers').
  exec(function (err, rows) {
    callback(rows);
  });
  


  // Repo.find(function (err, rows) {
  //   callback(rows);
  // })
}


module.exports.save = save;
module.exports.read = read;


// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.error('we are connected')


//   

//   var repo = new Repo({ name: 'git-consortium',  
//                         html_url: 'https://github.com/octocat/git-consortium',
//                         description: 'This repo is for demonstration purposes only.',
//                         forks: 24,
//                         watchers: 7,
//                         owner: { login: 'octocat', html_url: 'https://github.com/octocat' }
//                       });



// });


