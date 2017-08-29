import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {fetchStudents, fetchCampuses} from '../reducers';

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
        const student = this.state.students.find(student => student.id === id);
        const campusId = student.campusId;
        const campus = this.state.campuses.find(campus => campus.id === campusId);
        return (
              <div>
                <h3>{student.name ? student.name : ''}</h3>
                <h3>{campus.name ? campus.name : ''}</h3>
              </div>
          )
      }
}