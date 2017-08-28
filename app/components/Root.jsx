import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Students from './Students';
import Campuses from './Campuses';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Navbar />
                        <Campuses />
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