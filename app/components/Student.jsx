import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {getAllStudents, deleteStudentThunk, editStudentThunk} from '../reducers/index.jsx';
import AddStudent from './AddStudent.jsx';
// import { browserHistory } from 'react-router';
// import EditStudent from './EditStudent.jsx';

export default class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        //local state keys
        this.state.isEditing = false;
        this.state.editedName = '';
        this.state.editedEmail = '';
        this.state.editedCampus = '';


        //Methods
        this.handleDelete = this.handleDelete.bind(this);
        this.handleWriteName = this.handleWriteName.bind(this);
        this.handleWriteEmail = this.handleWriteEmail.bind(this);
        this.handleWriteCampus = this.handleWriteCampus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startEditing = this.startEditing.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    startEditing() {
        this.setState({isEditing: true});
        this.setState({editedName: this.props.student.name});
        this.setState({editedEmail: this.props.student.email});
        this.setState({editedCampus: this.props.student.campusId});
    }

    handleDelete(studentId) {
        store.dispatch(deleteStudentThunk(studentId, this.props.history));
    }

    handleWriteName(event) {
        let newName = event.target.value;
        this.setState({editedName: newName});
    }
    handleWriteEmail(event) {
        let newEmail = event.target.value;
        this.setState({editedEmail: newEmail});
    }
    handleWriteCampus(event) {
        let campusId = Number((this.state.campuses.find(campus => {
            return campus.name === event.target.value;
        })).id);
        this.setState({editedCampus: campusId});
    }
    handleSubmit(event) {
        event.preventDefault();
        const changedName = this.state.editedName;
        const changedEmail = this.state.editedEmail;
        const changedCampus = this.state.editedCampus;
        store.dispatch(editStudentThunk(this.props.student.id, changedName, changedEmail, changedCampus));
        this.setState({isEditing: false});
    }
    
    render() {
        var campus = '';
        const student = this.state.students.find(student => {
            return student.id === this.props.student.id; }
        );
        const campuses = this.state.campuses;
        if(student) {
            campus = campuses.find(campus => { return campus.id === student.campusId; })
            return (
                this.state.isEditing === false ? 
                (
                <div key={student.id}>
                    <Link to={`/students/${student.id}`}>
                        <div className="btn-group-justified">
                            <button className="btn list-group-item list-group-item-action">{student.name}</button>
                            <li id="email-field" className="btn list-group-item">{student.email}</li>
                            <button id="go-to-campus" className="btn list-group-item list-group-item-action"><Link to={`/campuses/${campus.id}`}>{campus ? campus.name : ''}</Link></button>
                        </div>
                    </Link>
                    <li><button 
                        className="btn btn-xs btn-danger remove btn-circle"
                        onClick={() => this.handleDelete(student.id)}>
                            Remove</button></li>
                    <li><button 
                        className="btn btn-xs btn-primary edit btn-circle"
                        onClick={() => this.startEditing()}>Edit Student</button></li>
                    <br />
                    <br />
                </div>)
                : (
                <div key={student.id}>
                    <form className="form-inline">
                        <div className="form-group col-xs-4 edit-student">
                            <input 
                            type="text" 
                            className="edit-student-info form-control" 
                            defaultValue={student.name}
                            onChange={this.handleWriteName}></input>
                        </div>
                        <div className="form-group col-xs-4 edit-student">
                            <input 
                            type="text" 
                            className="edit-student-info form-control" 
                            defaultValue={student.email}
                            onChange={this.handleWriteEmail}></input>
                        </div>
                        <div className="form-group col-xs-4 edit-student">
                            <select 
                                className="form-control dropdown-item" 
                                id="edit-dropdown" 
                                name="School" 
                                width="100%" 
                                onChange={this.handleWriteCampus}>
                                <option value="selected disabled hidden">Choose Campus</option>
                                {campuses.map(campus => {
                                    return <option key={campus.id} value={campus.name}>{campus.name}</option>
                                })}
                            </select>
                        </div>
                    </form>
                    <li><button 
                    className="btn btn-xs btn-danger remove btn-circle"
                    onClick={() => this.handleDelete(student.id)}>
                        Remove</button></li>
                    <li><button 
                        className="btn btn-xs btn-primary btn-circle"
                        onClick={this.handleSubmit}
                        >Submit Changes</button></li>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                </div>)
            ) 
        } else {
            return (<div/>)
        }
    }
}
