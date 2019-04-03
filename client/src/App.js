import React, { Component } from 'react';

import Register from './Register';
import Login from './Login';

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

  render() {
    return (
      <div className="App">
        <Register register={this.state.register} handleRegisterChange={this.handleRegisterChange}/>
        <Login login={this.state.login} handleLoginChange={this.handleLoginChange}/>
      </div>
    );
  }
}

export default App;
