import React, { Component } from 'react';
import {addStudent, writeStudent, writeCampus, writeStudentEmail} from '../reducers/index.jsx'
import {Campuses} from './Campuses.jsx'
import store from '../store';

export default class AddStudent extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handleStudentChange = this.handleStudentChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    handleStudentChange(event) {
        console.log(event.target.value)
        store.dispatch(writeStudent(event.target.value))
    }

    handleCampusChange(event) {
        store.dispatch(writeCampus(event.target.value))
    }
    handleEmailChange(event) {
        store.dispatch(writeStudentEmail(event.target.value));
    }

    handleSubmit(event) {
        event.preventDefault();
        const student = store.getState().newStudent;
        const studentEmail = store.getState().newStudentEmail;
        console.log(studentEmail);
        const campusName = store.getState().newStudentCampus;
        if(!campusName) alert("Please Choose a Campus to Enroll In");
        else {
            const campusId = Number((store.getState().campuses.find(campus => {
                return campus.name === campusName;
            })).id);
            store.dispatch(addStudent(student, studentEmail, campusId));
        }
    }

    render() {
        const campuses = this.state.campuses;
        return (
            <div>
                <div className="col-xs-6">
                <h3>Edit Student</h3>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input 
                    className="form-control" 
                    type="text" 
                    name="studentName" 
                    placeholder="Enter Student Name" 
                    onChange={this.handleStudentChange}
                    />
                </div>
                <div></div>
                <div className="form-group">
                <input 
                  className="form-control" 
                  type="text" 
                  name="studentEmail" 
                  placeholder="Enter Student Email" 
                  onChange={this.handleEmailChange}
                  />
                </div>
                <div></div>
                <label htmlFor="name">Choose Campus: </label>
                <div className="form-group">
                    <select className="dropdown-item" name="School" width="400px" onChange={this.handleCampusChange}>
                        <option value="selected disabled hidden">Choose here</option>
                        {campuses.map(campus => {
                            return <option key={campus.id} value={campus.name}>{campus.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Add Student</button>
                </div>
                </form>
                </div>
            </div>
        )
    }
}
