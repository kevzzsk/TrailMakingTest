import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserPageCard from './UserPageCard';
import exData from '../template/exData';

class DoctorPage extends Component {
    genCards = () => {
        return exData.Experiments.map((item, index) => {
            return (<Link to={`/doctor-page/view-experiments/${item.experimentID}`}><UserPageCard key={index} title={item.title} experimentID={item.experimentID} status={item.status} daysOnline={item.daysOnline} respondents={item.respondents} createDate={item.createDate} startDate={item.startDate} endDate={item.endDate}/></Link>)
        })
    }

render() {
    return (
        <div className="container-fluid">
            <br />
            <div className="card">
                <div className="row">
                    <div className="card">
                        <img className="rounded-circle" src={require('./profile.png')} />
                        <Link to={"/doctor-page/view-experiments"} type="button" className="btn btn-outline-secondary">View Your Experiments</Link>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <h4>Welcome Doctor01,</h4>
                            <div className="card" style={{ backgroundColor: "#6b6a68" }}>
                                <h5>Recent Experiments</h5>
                                <div className="card border" style={{ backgroundColor: "#d3d3d3" }}>
                                    {this.genCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default DoctorPage;