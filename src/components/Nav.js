import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user'); // Vérifie si l'utilisateur est connecté
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear(); // Efface les données de l'utilisateur
        navigate('/signup'); // Redirige vers la page de signup
    };

    return (
        <div>
             <img alt='logo'
             className='logo'
             src='https://th.bing.com/th/id/OIP.2PV99eYqHuspw4x27SGtAAHaEK?rs=1&pid=ImgDetMain'></img>


            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li>
                        <span onClick={logout} style={{ cursor: 'pointer' }}>Logout ({ JSON.parse(auth).name})</span>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
