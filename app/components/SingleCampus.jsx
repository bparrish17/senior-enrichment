import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import Student from './Student';
import AddStudent from './AddStudent';

export default class SingleCampus extends Component {
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
          const currentCampusId = Number(this.props.match.params.campusId);
          const campusStudents = store.getState().students.filter(student => {
            return student.campusId === currentCampusId;
          })
          const currentCampus = store.getState().campuses.find(campus => {
            return campus.id === currentCampusId;
          })
          console.log('CURRENT CAMPUS: ', currentCampus);
          return (
              <div>
                <div className="col-xs-6">
                  {currentCampus ? 
                    (<div>
                      <h3>Welcome to {currentCampus ? currentCampus.name : ""}</h3>
                      <img className="img-responsive" src={currentCampus.imgURL} />
                    </div>)
                    : <div className="col-xs-8"></div>
                  }
                </div>
                <div className="col-xs-5">
                  <h3>Students</h3>
                  <ul className="list-group">
                  {campusStudents.map(student => {
                    return (
                        <div key={student.id}>
                            <Student student={student}/>
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