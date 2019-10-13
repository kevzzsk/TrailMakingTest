import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import UserPageCard from './UserPageCard';
import exData from '../template/exData';

import ViewExperiment from "./ViewExperiment"

class UserPage extends Component {

    state={
        account: {},
        dataLoaded:false
    }

    componentWillMount(){
        if (this.props.location.state !== undefined){
            localStorage.setItem("account",JSON.stringify(this.props.location.state.account))
            this.setState({
                account: this.props.location.state.account,
                dataLoaded:true
            })
        } else{
            let cache_data = localStorage.getItem("account")
            if(cache_data !== undefined){
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

    render() {
        return (
            <div className="dashboard-bg p-3">
                <div className="dashboard-left">
                    <img className="rounded-circle" width="200px" height="200px" src={this.state.dataLoaded? this.state.account.avatarURL :require('./profile.png')} />
                    <div className="w-100 align-content-stretch">
                        <Link to={"/user-page/create-experiment"}><Button size="large" color="primary" variant="contained" className="w-100">Create Experiments</Button></Link>
                        <Link to={"/user-page/create-template"}><Button size="large" color="primary" variant="contained" className="w-100 mt-2">Create Template</Button></Link>
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

export default UserPage;