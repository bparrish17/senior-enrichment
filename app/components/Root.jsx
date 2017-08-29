import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Students from './Students';
import Campuses from './Campuses';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import {fetchStudents, fetchCampuses} from '../reducers';
import store from '../store';

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
                    <div className='container-fluid'>
                        <Switch>
                            <Route exact path="/students" component={Students} />
                            <Route exact path="/campuses" component={Campuses} />
                            <Route path="/students/:studentId" component={SingleStudent} />
                            <Route path="/campuses/:campusId" component={SingleCampus} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

// <main>
// <Switch>
//     <Route exact path="/students" component={Students} />
//     {/*<Route path="/api/students/:studentId" component={SingleStudent} />*/}
//     {/*<Route exact path="/api/campuses" component={Campuses} />*/}
//     {/*<Route path="/api/campuses/:campusId" component={SingleCampus} />*/}
//     {/*<Route component={StatefulAlbums} />*/}
// </Switch>
//</main>