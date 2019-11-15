import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import ViewExperiment from "./ViewExperiment"

/**
 * Researcher Account Page. Shows the dashboard for researcher
 */
class UserPage extends Component {

    state={
        account: {},
        dataLoaded:false
    }

    /**
     * @method
     * @description Ensure page is loaded with appropriate account data. Get cache data from localstorage
     */
    componentWillMount(){
        
        if (this.props.location.state !== undefined){
            localStorage.setItem("account",JSON.stringify(this.props.location.state.account))
            this.setState({
                account: this.props.location.state.account,
                dataLoaded:true
            })
        } else{
            
            let cache_data = localStorage.getItem("account")
            console.log(cache_data)
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

    render() {
        return (
            <div className="dashboard-bg p-3">
                <div className="dashboard-left">
                    <img className="rounded-circle" width="200px" height="200px" src={this.state.dataLoaded? this.state.account.avatarURL :require('./profile.png')} />
                    <div className="w-100 align-content-stretch">
                        <Link to={{
                            pathname:"/user-page/create-experiment",
                            state:{
                                accountID:this.state.account.accountID
                            }
                        }}><Button size="large" color="primary" variant="contained" className="w-100 mt-3">Create Experiments</Button></Link>
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