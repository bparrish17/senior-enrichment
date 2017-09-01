import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import {fetchStudents, fetchCampuses} from '../reducers';
import store from '../store'

export default class Root extends Component {

    componentDidMount() {
        store.dispatch(fetchCampuses());
        store.dispatch(fetchStudents());
    }
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <div className="container-fluid">
                                <Route exact path="/students" component={Students} />
                                <Route exact path="/campuses" component={Campuses} />
                                <Route path="/students/:studentId" component={SingleStudent} />
                                <Route path="/campuses/:campusId" component={SingleCampus} />
                            </div>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

// /<Route exact path="/" component={Home} />

// <main>
// <Switch>
//     <Route exact path="/students" component={Students} />
//     {/*<Route path="/api/students/:studentId" component={SingleStudent} />*/}
//     {/*<Route exact path="/api/campuses" component={Campuses} />*/}
//     {/*<Route path="/api/campuses/:campusId" component={SingleCampus} />*/}
//     {/*<Route component={StatefulAlbums} />*/}
// </Switch>
//</main>