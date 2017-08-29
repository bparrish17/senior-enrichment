
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {fetchStudents} from '../reducers/index.jsx'; 
import {getAllStudents, deleteStudent} from '../reducers/index.jsx';
import AddStudent from './AddStudent.jsx';

export default class Students extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete (studentId) {
        store.dispatch(deleteStudent(studentId));
    }

    render() {
        const students = this.state.students;
        return (
            <div>
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
                            <li><button 
                                className="btn btn-xs btn-danger remove btn-circle"
                                onClick={() => this.handleDelete(student.id)}>
                                    Remove</button></li>
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