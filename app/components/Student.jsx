import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {getAllStudents, deleteStudentThunk} from '../reducers/index.jsx';
import AddStudent from './AddStudent.jsx';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(studentId) {
        store.dispatch(deleteStudentThunk(studentId));
    }
    
    render() {
        const student = this.props.student;
        const campus = store.getState().campuses.find(campus => {
            return campus.id === student.campusId;
        })
        return (
            <div key={student.id}>
            <Link to={`/students/${student.id}`}>
                <div width="60%">
                <button className="list-group-item list-group-item-action">{student.name}{campus.name}</button>
                </div>
            </Link>
            <li><button 
                className="btn btn-xs btn-danger remove btn-circle"
                onClick={() => this.handleDelete(student.id)}>
                    Remove</button></li>
            <li><button className="btn btn-xs btn-primary edit btn-circle">Edit Student</button></li>
            </div>
        )
    }
}
