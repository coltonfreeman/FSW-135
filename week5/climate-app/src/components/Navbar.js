import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

export default function Navbar() {
    const { logout } = useContext(UserContext);
    return (
        <div className="navbar">
            <Link to="/">Profile</Link>
            <Link to="/public">Public</Link>
            <button onClick={ logout }>Logout</button>
        </div>
    )
}