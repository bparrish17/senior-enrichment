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
        const id = Number(this.props.match.params.studentId);
        const student = store.getState().students.find(student => student.id === id);
        const campusId = student.campusId;
        const campus = store.getState().campuses.find(campus => campus.id === campusId);
        return (
              <div>
                <h3>{student.name}</h3>
                <br />
                <ul className="list-group">
                  <Student student={student} />
                </ul>
              </div>
          )
      }
}