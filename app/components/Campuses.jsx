import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends React.Component {
    //get campuses through props -- store?
    constructor() {
        super();
        this.state = {
            campuses: []
        }
    }
    componentDidMount () {
        axios.get('/api/campuses/')
          .then(res => res.data)
          .then(campuses => {
            this.setState({ campuses })
          });
    }
    render() {
        const campuses = this.state.campuses;
        return (
            <div>
                <h3>Campuses</h3>
                <div className="col-xs-6">
                {
                    campuses.map(campus => { 
                        return <h3 key={campus.id}>{campus.name}</h3> 
                    })
                }
                </div>
            </div>
          );
        }
    };
    
//     <div className="col-xs-4" key={ campus.id }>
//     <div className="campusName">
//         <h5>
//             <span>{ campus.name }</span>
//         </h5>
//     </div>
//     <Link className="thumbnail" to={`/campuses/${campus.id}`}>
//     <img src={`.../public/campus_imgs/campusimg${campus.id}.png`} />
//     </Link>
// </div>