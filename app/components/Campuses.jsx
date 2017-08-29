import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {getAllCampuses} from '../reducers/index.jsx';

export default class Campuses extends React.Component {
    //get campuses through props -- store?
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    render() {
        const campuses = this.state.campuses;
        return (
            <div>
                <div className="row container-fluid">
                <h3>Campuses</h3>
                <br />
                {
                    campuses.map(campus => { 
                        return(
                        <div className="col-xs-4" key={campus.id}>
                            <Link className="thumbnail img-responsive" to={`/campuses/${campus.id}`}>
                            <h3>
                                <span>{campus.name}</span>
                            </h3>
                            <img className="img-resposive" src={campus.imgURL} alt="image not found"/>
                            </Link>
                        </div> 
                        )
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
//`.../public/campus_imgs/campusimg${campus.id}`