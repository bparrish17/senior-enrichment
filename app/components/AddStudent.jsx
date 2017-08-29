import React, { Component } from 'react';
import {addStudent, writeStudent, writeCampus} from '../reducers/index.jsx'
import {Campuses} from './Campuses.jsx'
import store from '../store';

export default class AddStudent extends Component {
    constructor() {
        super();
        this.state = store.getState();
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

    handleSubmit(event) {
        event.preventDefault();
        const student = store.getState().newStudent;
        const campus = store.getState().newStudentCampus;
        store.dispatch(addStudent(student, campus));
    }

    render() {
        const campuses = this.state.campuses;
        return (
            <div>
                <div className="col-xs-6">
                <h3>Add Student</h3>
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
                <label htmlFor="name">Choose Campus: </label>
                <div className="form-group">
                    <select className="dropdown-item" name="School" width="400px" onChange={this.handleCampusChange}>
                        {campuses.map(campus => {
                            return <option>{campus.name}</option>
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


// <form onSubmit={props.handleSubmit}>
// <div className="form-group">
//   <label htmlFor="name">Add Student</label>
//   <input 
//     className="form-control" 
//     type="text" 
//     name="studentName" 
//     placeholder="Enter Student Name" 
//     />
//   {/* DROPDOWN MENU FOR CAMPUSES */}
//   <select onChange={/*-----*/} className="dropdown-item" name="School">
//       {campuses.map(campus => {
//           return <option value={campus.id}>{campus.name}</option>
//       })}
//   </select>
// </div>
// <div className="form-group">
//   <button type="submit" className="btn btn-default">Create Channel</button>
// </div>
// </form>
// value={/*-----*/} 
// onChange={/*-----*/}