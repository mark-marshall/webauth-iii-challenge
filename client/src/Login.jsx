import React from 'react';

export default function Register({ login, handleLoginChange, fireLogin }) {
  return (
    <div>
      <h1>Login</h1>
      <input
        name="username"
        placeholder="username"
        value={login.username}
        onChange={handleLoginChange}
        type="text"
      />
      <input
        name="password"
        placeholder="password"
        value={login.password}
        onChange={handleLoginChange}
        type="password"
      />
      <button onClick={event => fireLogin(event, login)}>Login</button>
    </div>
  );
}
