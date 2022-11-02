import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default function TopBar(props) {

    const logOut = props.logOut;
    return (

        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">DashBoard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/upload">Upload</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/management">Data Center</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Personal Center</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to = '/' onClick={logOut}>Log Out</Link>
                </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
