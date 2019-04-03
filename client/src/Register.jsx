import React from 'react';

export default function Register({ register, handleRegisterChange, fireRegistration }) {
  return (
    <div>
      <h1>Register</h1>
      <input
        name="username"
        placeholder="username"
        value={register.username}
        onChange={handleRegisterChange}
        type="text"
      />
      <input
        name="password"
        placeholder="password"
        value={register.password}
        onChange={handleRegisterChange}
        type="password"
      />
      <input
        name="department"
        placeholder="department"
        value={register.department}
        onChange={handleRegisterChange}
        type="text"
      />
      <button onClick={event => fireRegistration(event, register)}>Register</button>
    </div>
  );
}
