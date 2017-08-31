import React, { Component } from 'react';
import {addCampus, writeCampusName, writeCampusImage} from '../reducers/index.jsx'
import {Campuses} from './Campuses.jsx'
import store from '../store';

export default class AddCampus extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handleCampusNameChange = this.handleCampusNameChange.bind(this);
        this.handleCampusImageChange = this.handleCampusImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    handleCampusNameChange(event) {
        // console.log(event.target.value)
        store.dispatch(writeCampusName(event.target.value))
    }

    handleCampusImageChange(event) {
        // console.log(event.target.value)
        store.dispatch(writeCampusImage(event.target.value))
    }

    handleSubmit(event) {
        event.preventDefault();
        const campusName= store.getState().newCampusName;
        const campusImage = store.getState().newCampusImage;
        store.dispatch(addCampus(campusName, campusImage));
        document.getElementById("add-campus-form").reset();
    }

    render() {
        return (
            <div>
                <div className="col-xs-4">
                <h5>Create New</h5>
                <form id="add-campus-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            name="campusName" 
                            placeholder="Enter Campus Name" 
                            onChange={this.handleCampusNameChange}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            name="campusImage" 
                            placeholder="Enter Campus Image URL" 
                            onChange={this.handleCampusImageChange}
                            />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Add Campus</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}