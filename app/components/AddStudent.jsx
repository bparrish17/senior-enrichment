import React, { Component } from 'react';
import {addStudent} from '../reducers/index.jsx'
import {Campuses} from './Campuses.jsx'

export default class AddStudent extends Component {
    render() {
        return (
            <form onSubmit={props.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Add Student</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="studentName" 
                  placeholder="Enter Student Name" 
                  value={/*-----*/} 
                  onChange={/*-----*/}
                  />
                {/* DROPDOWN MENU FOR CAMPUSES */}
                <select onChange={/*-----*/} className="dropdown-item" name="School">
                    {campuses.map(campus => {
                        return <option value={campus.id}>{campus.name}</option>
                    })}
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-default">Create Channel</button>
              </div>
            </form>
        )
    }
}