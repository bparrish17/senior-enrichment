import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {editCampusThunk, deleteCampusThunk, deleteStudentThunk} from '../reducers/index.jsx';
import Student from './Student';
import AddStudent from './AddStudent';

export default class SingleCampus extends Component {
    constructor () {
        super();
        this.state = store.getState();
        this.state.editedCampusName = '';
        this.state.editedCampusImage = '';

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

      }
      componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      handleNameChange(event) {
        let newName = event.target.value;
        this.setState({editedCampusName: newName});
      }
      
      handleImageChange(event) {
        let newImage = event.target.value;
        this.setState({editedCampusImage: newImage});
      }

      
      handleDelete(campusId) {
        const deletedStudents = this.state.students.filter(student => {
          return student.campusId === campusId; 
        });
        deletedStudents.forEach(student => {
          store.dispatch(deleteStudentThunk(student.id));
        });
        store.dispatch(deleteCampusThunk(campusId, this.props.history));
      }

      handleSubmit(event) {
        console.log("HERE");
        event.preventDefault();

        //preserve old campus value if unchanged
        const campusId = Number(this.props.match.params.campusId);
        const campusToEdit = this.state.campuses.find(campus => {
          return campus.id === campusId;
        })
        var changedName = '';
        var changedImage = '';
        this.state.editedCampusName.length === 0 ? (changedName = campusToEdit.name) : changedName = this.state.editedCampusName;
        this.state.editedCampusImage.length === 0 ? (changedImage = campusToEdit.imgURL) : changedImage = this.state.editedCampusImage;
        this.setState({editedCampusName: changedName, editedCampusImage: changedImage}, () => {
          store.dispatch(editCampusThunk(campusId, changedName, changedImage));
          document.getElementById('edit-campus-form').reset();
        })
      }

      render() {
          const currentCampusId = Number(this.props.match.params.campusId);
          const campusStudents = this.state.students.filter(student => {
            return student.campusId === currentCampusId;
          })
          const currentCampus = this.state.campuses.find(campus => {
            return campus.id === currentCampusId;
          })
          if(currentCampus) {
            return (
              <div>
                <div className="col-xs-6">
                  {currentCampus ? 
                    (<div>
                      <h3>Welcome to {currentCampus ? currentCampus.name : ""}</h3>
                      <img className="img-responsive" src={currentCampus.imgURL} />
                      <h3>Edit Campus</h3>
                      <form id="edit-campus-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="campusName" 
                                placeholder="Enter New Campus Name" 
                                onChange={this.handleNameChange}
                                />
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="campusImage" 
                                placeholder="Enter New Campus Image URL" 
                                onChange={this.handleImageChange}
                                />
                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary">Submit Changes</button>
                        </div>
                  </form>
                  <ul>
                    <li><button 
                      id="remove-campus-button"
                      className="btn btn-xs btn-danger remove btn-circle"
                      onClick={() => this.handleDelete(currentCampus.id)}>
                        Remove Campus
                        </button></li>
                  </ul>
                    </div>)
                    : <div className="col-xs-8"></div>
                  }
                </div>
                <div className="col-xs-6">
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
                <br />
                <br />
                <div className="col-xs-6">
            </div>
              </div>
            ) 
          } else {
            return (<div>
                      <h2>No Campus With ID: {currentCampusId}</h2>
                    </div>
                  )
          }
      }
}

// this.setState({editedCampusName: campusToEdit.name});
        // const changedName = this.state.editedCampusName;
        // const changedImage = this.state.editedCampusImage;
        // if(!changedName) this.setState({editedCampusName: campusToEdit.name});
        // if(!changedImage) this.setState({editedCampusImage: campusToEdit.imgURL});

        // if(this.state.editedCampusImage.length === 0) {
        //   changedImage = campusToEdit.imgURL;
        //   console.log('CAMPUS TO EDIT URL', campusToEdit.imgURL)
        //   this.setState({editedCampusImage: campusToEdit.imgURL}, () => {
        //   });
        // }
        // const changedImage = this.state.editedCampusImage;

        // tingMode() {
          //   // const currentCampusId = Number(this.props.match.params.campusId);
          //   // const campusToEdit = store.getState().campuses.find(campus => {
          //   //   return campus.id === currentCampusId;
          //   // })
          //   // this.setState({editedCampusName: campusToEdit.name});
          //   // this.setState({editedCampusImage: campusToEdit.imgURL});
          // }