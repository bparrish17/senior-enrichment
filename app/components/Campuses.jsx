import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {fetchCampuses} from '../reducers/index.jsx'; 
import {getAllCampuses} from '../reducers/index.jsx';

export default class Campuses extends React.Component {
    //get campuses through props -- store?
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount () {
        const thunk = fetchCampuses();
        store.dispatch(thunk)
        // axios.get('/api/campuses/')
        //   .then(res => res.data)
        //   .then(campuses => {
        //     this.setState({ campuses })
        //   });
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    render() {
        const campuses = this.state.campuses;
        return (
            <div>
                <h3>Campuses</h3>
                <div className="row">
                {
                    campuses.map(campus => { 
                        return(
                        <div className="col-xs-6" key={campus.id}>
                            <Link className="thumbnail" to={`/campuses/${campus.id}`}>
                            <h3>
                                <span>{campus.name}</span>
                            </h3>
                            <img className="media-object" src={campus.imgUrl} alt="image"/>
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