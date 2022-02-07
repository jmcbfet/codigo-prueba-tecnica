import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/dashboard/orders">Menu</Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
};

export default Navbar;
