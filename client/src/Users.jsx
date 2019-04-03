import React from 'react';

import Logout from './Logout';

export default function Users({ users, fireLogout }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>User: {user.username}</p>
            <p>Department: {user.department}</p>
          </li>
        ))}
      </ul>
      <Logout fireLogout={fireLogout}/>
    </div>
  );
}
