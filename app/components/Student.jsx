import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {getAllStudents, deleteStudentThunk} from '../reducers/index.jsx';
import AddStudent from './AddStudent.jsx';
import EditStudent from './EditStudent.jsx';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleDelete = this.handleDelete.bind(this);
        this.state.isEditing = false;
    }

    handleDelete(studentId) {
        store.dispatch(deleteStudentThunk(studentId));
    }

    handleEdit() { 
    }
    
    render() {
        const student = this.props.student;
        const campus = store.getState().campuses.find(campus => {
            return campus.id === student.campusId;
        })
        return (
            !this.state.isEditing ? 
            (
            <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                    <div className="btn-group-justified">
                        <button className="btn list-group-item list-group-item-action">{student.name}</button>
                        <li id="email-field" className="btn list-group-item">{student.email}</li>
                        <button className="btn list-group-item list-group-item-action">{campus ? campus.name : ''}</button>
                    </div>
                </Link>
                <li><button 
                    className="btn btn-xs btn-danger remove btn-circle"
                    onClick={() => this.handleDelete(student.id)}>
                        Remove</button></li>
                <li><button 
                    className="btn btn-xs btn-primary edit btn-circle"
                    onClick = {() => this.setState({isEditing: true})}>Edit Student</button></li>
                <br />
                <br />
            </div>)
            : (
            <div>
                <form className="form-inline">
                    <div className="form-group col-xs-4 edit-student">
                        <input type="text" className="form-control"></input>
                    </div>
                    <div className="form-group col-xs-4 edit-student">
                        <input type="password" className="form-control"></input>
                    </div>
                    <div className="form-group col-xs-4 edit-student">
                        <input type="password" className="form-control" id="pwd"></input>
                    </div>
                </form>
                <li><button 
                className="btn btn-xs btn-danger remove btn-circle"
                onClick={() => this.handleDelete(student.id)}>
                    Remove</button></li>
                <li><button 
                    className="btn btn-xs btn-primary edit btn-circle"
                    //onClick
                    >Submit Changes</button></li>
                <br />
                <br />
            </div>)
        ) 
    }
}
