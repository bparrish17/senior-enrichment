import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
        <nav>
            <ul>
                <li><a href="default.asp">Home</a></li>
                <li><a href="/students">Students</a></li>
                <li><a href="/campuses">Campuses</a></li>
            </ul>
        </nav>
    )
    }
}