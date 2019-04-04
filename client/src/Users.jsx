import React, { Component } from 'react';

class Users extends Component {

  componentDidMount() {
    if(localStorage.getItem('token') && this.props.loggedIn){
      this.props.grabUsers();
    }
  }

  render(){
    return (
      <div>
      <h1>Users</h1>
      <ul>
        {this.props.users.map(user => (
          <li key={user.id}>
            <p>User: {user.username}</p>
            <p>Department: {user.department}</p>
          </li>
        ))}
      </ul>
    </div>
    )
  }
}

export default Users;
