import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserPageCard from './UserPageCard';

class UserPage extends Component {

    render() {
        return (
            <div className="container">
                <br />
                <div className="card">
                    <div className="row">
                        <div className="card">
                            <img className="rounded-circle" src={require('./profile.png')} />
                            <Link to={"/user-page/view-experiments"} type="button" className="btn btn-outline-secondary">View Your Experiments</Link>
                            <Link to={"/user-page/create-experiment"} type="button" className="btn btn-outline-secondary">Create New Experiments</Link>
                        </div>
                        <div className="col-6">
                            <div className="card">
                                <h4>Welcome Researcher01,</h4>
                                <div className="card" style={{ backgroundColor: "#6b6a68" }}>
                                    <h5>Recent Experiments</h5>
                                    <div className="card border" style={{ backgroundColor: "#d3d3d3" }}>
                                        <span>Experiment ID: 123456789</span>
                                        <UserPageCard/>
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

export default UserPage;