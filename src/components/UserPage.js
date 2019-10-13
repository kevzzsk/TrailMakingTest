import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button"
import UserPageCard from './UserPageCard';
import exData from '../template/exData';

import ViewExperiment from "./ViewExperiment"

class UserPage extends Component {


    componentDidMount(){

    }

    genCards = () => {
        return exData.Experiments.map((item, index) => {
            return (<Link key={index} to={`/user-page/view-experiments/${item.experimentID}`}><UserPageCard key={index} title={item.title} experimentID={item.experimentID} status={item.status} daysOnline={item.daysOnline} respondents={item.respondents} createDate={item.createDate} startDate={item.startDate} endDate={item.endDate} /></Link>)
        })
    }

    render() {
        return (
            <div className="dashboard-bg p-3">
                <div className="dashboard-left">
                    <img className="rounded-circle" src={require('./profile.png')} />
                    <div className="w-100 align-content-stretch">
                        <Link to={"/user-page/create-experiment"}><Button size="large" color="primary" variant="contained" className="w-100">Create Experiments</Button></Link>
                        <Link to={"/user-page/create-template"}><Button size="large" color="primary" variant="contained" className="w-100 mt-2">Create Template</Button></Link>
                    </div>
                </div>
                <div className="w-100 h-100">
                        <h4>Welcome Researcher,</h4>
                        <ViewExperiment />
                </div>
            </div>
        )
    }
}

export default UserPage;