import React from 'react';

export default function Logout({ fireLogout }) {
    return (
        <button onClick={() => fireLogout()}>Logout</button>
    )
}