import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {fetchStudents, fetchCampuses} from '../reducers';
import Student from './Student';

export default class SingleStudent extends Component {
    constructor () {
        super();
        this.state = store.getState();
      }
    
      componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const currentId = Number(this.props.match.params.studentId);
        const currentStudent = this.state.students.find(student => student.id === currentId);
        if(currentStudent) {
          const currentCampusId = currentStudent.campusId;
          const currentCampus = this.state.campuses.find(campus => campus.id === currentCampusId);
          return (
                <div>
                  <h3>{currentStudent.name}</h3>
                  <br />
                  <ul className="list-group">
                    <Student student={currentStudent} history={this.props.history} />
                  </ul>
                </div>
            )
        } else {
          return (<div/>)
        }
      }
}