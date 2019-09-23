import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class UserPage extends Component{
    render(){
        return(
            <div class="container">
                <br/>
                <div class="row">
                    <div class="card">
                        <img class="rounded-circle" src={require('./profile.png')}/>
                        <Link to={"./view-experiments"} type="button" class="btn btn-outline-secondary">View Your Experiments</Link>
                        <Link to={"./create-experiment"} type="button" class="btn btn-outline-secondary">Create New Experiments</Link>
                    </div>
                    <div class="col-3">
                        <h4>Welcome Researcher01,</h4>
                        <div class="card"  style={{backgroundColor:"#6b6a68"}}>
                            <h5>Recent Experiments</h5>
                            <div class="card border" style={{backgroundColor:"#d3d3d3"}}>
                                <span>Experiment ID: 123456789</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;