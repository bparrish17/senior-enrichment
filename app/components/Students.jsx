
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {fetchStudents} from '../reducers/index.jsx'; 
import {getAllStudents} from '../reducers/index.jsx';
import AddStudent from './AddStudent.jsx';

export default class Students extends React.Component {
    //get campuses through props -- store?
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount () {
        const thunk = fetchStudents();
        store.dispatch(thunk);
        // axios.get('/api/students/')
        //   .then(res => res.data)
        //   .then(students => {
        //     this.setState({ students })
        //   });
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }

    render() {
        const students = this.state.students;
        return (
            <div>
                {/* a row looks like this, try to map through
                all the values to get it all into 4 tds
                PROBLEM: Getting campus name, not id*/}
                <div className="col-xs-6">
                <h3>Students</h3>
                <ul className="list-group">
                {students.map(student => {
                    return (
                        <div key={student.id}>
                            <Link to={`/students/${student.id}`}>
                                <div width="100%">
                                <button className="list-group-item list-group-item-action">{student.name}</button>
                                </div>
                            </Link>
                            <li><button className="btn btn-xs btn-danger remove btn-circle">Remove</button></li>
                            <li><button className="btn btn-xs btn-primary edit btn-circle">Edit Student</button></li>
                        </div>
                    )
                })}
                </ul>
                </div>
                <AddStudent />
            </div>
        )
    }
}
