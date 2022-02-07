import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {user[0].id_rol === 1 ?
                        <>
                            <li class="nav-item active">
                                <Link className="nav-link" to="/dashboard/orders">Orders</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/dashboard/users">Users</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/dashboard/products">Products</Link>
                            </li>
                        </>
                        : null
                    }
                    {user[0].id_rol === 2 ?
                        <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/dashboard/orders">Orders</Link>
                            </li>
                        </>
                        : null}
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Salir</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default DashboardNavbar;
