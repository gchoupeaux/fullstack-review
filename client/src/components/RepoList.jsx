import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
     

      <table>
       <thead>
        <tr>
           <th>watchers</th>
           <th>login</th>
            <th>name</th>
            <th>url</th>
        </tr>
       </thead>
       <tbody>
            {props.repos.map(item => (
          <tr key={item.id}>
            <td>{item.watchers}</td>  
            <td style={{color:'red'}}>{item.owner.login}</td> 
            <td>{item.name}</td>  
            <td><a href={`${item.html_url}`}> {item.html_url} </a></td> 
          </tr>
        ))}
       </tbody>
      </table>
      

  </div>
)

export default RepoList;


 // <ul>
 //        {props.repos.map(item => (
 //          <li key={item.id}>{item.watchers} <span style={{color:'red'}}>{item.watchers}</span> {item.name} <a href={`${item.html_url}`}> {item.html_url} </a></li>
 //        ))}
 //      </ul>
