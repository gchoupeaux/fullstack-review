import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(this);
    console.log(`${term} was searched`);
    
    if (term){
      //send a POST request to /repos
      $.post('http://localhost:1128/repos',
      {
        username: term,
      },
      function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
      });
    }

  }

  // component will mount
  // get call
  // 
  componentWillMount(){

  let app = this;

    //send a POST request to /repos
    $.get('http://localhost:1128/repos',
    {
      username: 'test',
    },
    function(data, status){
      app.setState({
        repos: JSON.parse(data)
      });
      console.log("Data: " + data + "\nStatus: " + status);
    });

  }

  render () {

    
    

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));