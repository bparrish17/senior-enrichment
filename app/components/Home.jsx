import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';

const Home = () => {
    return(
        <div className="home-page">
            <div id="title" className="list-unstyled col-sm-12 col-xs-12">
                <h1>Interdimensial Education Administration</h1>
                <h3>of</h3>
                <h2>Galactic Campus Planets and Stuff</h2>
                <br />
                <Link to="/students"><button id="title-button" type="submit" className="btn btn-primary">What Up Fam</button></Link>
            </div>
        </div>
    )
}

export default Home;

//<img id="home-background" src="http://christensenastroimages.com/nebula/horsehead_20041211.jpg" className="visible img-responsive" />