import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import UserPageCard from './UserPageCard';
import exData from '../template/exData';

import ViewExperiment from "./ViewExperiment"

class DoctorPage extends Component {

    state={
        account: {},
        dataLoaded:false
    }


    componentWillMount(){
        if (this.props.location.state !== undefined ){
            localStorage.setItem("account",JSON.stringify(this.props.location.state.account))
            this.setState({
                account: this.props.location.state.account,
                dataLoaded:true
            })
        } else{
            let cache_data = localStorage.getItem("account")
            if(cache_data !== undefined && cache_data !== null){
                this.setState({
                    account:JSON.parse(cache_data),
                    dataLoaded:true
                })
            }else{
                this.setState({
                    dataLoaded:false
                })
            }
            
        }
        
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
                    <img className="rounded-circle" width="200px" height="200px" src={this.state.dataLoaded? this.state.account.avatarURL :require('./profile.png')} />
                    <div className="w-100 align-content-stretch">
                        <Link to={"/doctor-page/view-experiments"}><Button size="large" color="primary" variant="contained" className="w-100 mt-3">View All Experiments</Button></Link>
                    </div>
                </div>
                <div className="w-100 h-100">
                        <Typography variant="h3">Welcome {this.state.dataLoaded? this.state.account.accountName: "User" },</Typography>
                        <ViewExperiment />
                </div>
            </div>
        )
    }
}

export default DoctorPage;