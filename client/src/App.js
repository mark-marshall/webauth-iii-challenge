import React, { Component } from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';

import axios from './axios';
import Register from './Register';
import Login from './Login';
import Users from './Users';

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
    loggedIn: false,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.grabUsers();
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem('token') && !this.state.loggedIn) {
      this.setLogin();
    }
  }

  setLogin = () => {
    if (localStorage.getItem('token')) {
      this.setState({
        loggedIn: true,
      });
    }
  };

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
    this.toggleLogin();
    this.resetForms();
  };

  postRegistration = user => {
    axios()
      .post(registerUrl, user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.setLogin();
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
        this.setLogin();
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
        <Route
          exact
          path="/"
          render={() =>
            !this.state.loggedIn && !localStorage.getItem('token') ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/users" />
            )
          }
        />

        <Route
          path="/register"
          render={routeProps =>
            this.state.loggedIn && localStorage.getItem('token') ? (
              <Redirect to="/users" />
            ) : (
              <Register
                {...routeProps}
                register={this.state.register}
                handleRegisterChange={this.handleRegisterChange}
                fireRegistration={this.fireRegistration}
              />
            )
          }
        />

        <Route
          path="/login"
          render={routeProps =>
            this.state.loggedIn && localStorage.getItem('token') ? (
              <Redirect to="/users" />
            ) : (
              <Login
                {...routeProps}
                login={this.state.login}
                handleLoginChange={this.handleLoginChange}
                fireLogin={this.fireLogin}
              />
            )
          }
        />

        <Route
          path="/users"
          render={routeProps =>
            !this.state.loggedIn || !localStorage.getItem('token') ? (
              <Redirect to="/login" />
            ) : (
              <Users {...routeProps} users={this.state.users} />
            )
          }
        />
      </div>
    );
  }
}

export default App;
