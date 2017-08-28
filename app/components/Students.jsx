
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Students extends React.Component {
    //get campuses through props -- store?
    constructor() {
        super();
        this.state = {
            students: []
        }
    }
    componentDidMount () {
        axios.get('/api/students/')
          .then(res => res.data)
          .then(students => {
            this.setState({ students })
          });
    }

    render() {
        const students = this.state.students;
        console.log('MADE IT TO STUDENTS', students);
        return (
            <div>
                <h3>Students</h3>
                {/* a row looks like this, try to map through
                all the values to get it all into 4 tds
                PROBLEM: Getting campus name, not id*/}
                <ul className="list-group">
                {students.map(student => {
                    return (
                        <li className="list-group-item" key={student.id}>{student.name}</li>
                    )
                })}
                </ul>
            </div>
        )
    }
}
