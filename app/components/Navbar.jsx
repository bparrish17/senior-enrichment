import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
        <nav>
            <ul id="navbar-list">
                <li><Link to="/students">Home</Link></li>
                <li><Link to="/students">Students</Link></li>
                <li><Link to="/campuses">Campuses</Link></li>
            </ul>
        </nav>
    )
    }
}