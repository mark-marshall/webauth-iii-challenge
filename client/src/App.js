import React, { Component } from 'react';
import axios from './axios';

import Register from './Register';
import Login from './Login';

const registerUrl = 'http://localhost:4500/api/register';
const loginUrl = 'http://localhost:4500/api/login';
const usersUrl = 'http://localhost:4500/api/users';

class App extends Component {
  state = {
    register: {
      username: '',
      password: '',
      department: '',
    },
    login: {
      username: '',
      password: '',
    },
    users: [],
    error: '',
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.grabUsers();
    }
  }

  resetForms = () => {
    this.setState({
      register: {
        username: '',
        password: '',
        department: '',
      },
      login: {
        username: '',
        password: '',
      },
    });
  };

  handleRegisterChange = event => {
    this.setState({
      register: {
        ...this.state.register,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLoginChange = event => {
    this.setState({
      login: {
        ...this.state.login,
        [event.target.name]: event.target.value,
      },
    });
  };

  setError = error => {
    this.setState({
      error,
    });
  };

  fireRegistration = (event, user) => {
    event.preventDefault();
    this.postRegistration(user);
    this.resetForms();
  };

  postRegistration = user => {
    axios()
      .post(registerUrl, user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
      })
      .catch(error => this.setError(error.message));
  };

  fireLogin = (event, user) => {
    event.preventDefault();
    this.postLogin(user);
    this.resetForms();
  };

  postLogin = user => {
    axios()
      .post(loginUrl, user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
      })
      .catch(error => this.setError(error.message));
  };

  grabUsers = () => {
    axios()
      .get(usersUrl)
      .then(res => this.setUsers(res.data))
      .catch(error => this.setError(error.message));
  };

  setUsers = users => {
    this.setState({
      users,
    });
  };

  render() {
    return (
      <div className="App">
        <Register
          register={this.state.register}
          handleRegisterChange={this.handleRegisterChange}
          fireRegistration={this.fireRegistration}
        />
        <Login
          login={this.state.login}
          handleLoginChange={this.handleLoginChange}
          fireLogin={this.fireLogin}
        />
      </div>
    );
  }
}

export default App;
