import React, { Component } from 'react';
import axios from 'axios';

export default class SingleCampus extends Component {
    constructor () {
        super();
        this.state = {
          campus: {}
        };
      }
    
      componentDidMount () {
        const campusId = this.props.match.params.campusId;
    
        axios.get(`/api/campuses/${campusId}`)
          .then(res => res.data)
          .then(campus => this.setState({
            campus
          }));
      }
      render() {
          const campus = this.state.campus;
          return (
              <div>
                <h1>{campus.name}</h1>
              </div>
          )
      }
}