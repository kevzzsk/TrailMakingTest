import React, { Component } from 'react';
import {Link} from "react-router-dom";

class LoginPage extends Component {

    state = {
        username : null,
        password : null
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    checkLogin = () => {
        // console.log(this.state)
        // checks login details against DB
    }

    render() {
        return (
                <form>
                    <div className="form-group container">
                        <br/>
                        <label style={{fontFamily:'Helvetica'}}>USERNAME</label>
                        <input type="Username" className="form-control" placeholder="" ref={(username) => this.username = username} onChange={this.handleUsername}/>
                        <label style={{paddingTop:10, fontFamily:'Helvetica'}}>PASSWORD</label>
                        <input type="Password" className="form-control" placeholder="" ref={(password) => this.password = password} onChange={this.handlePassword}/>
                        <br/>
                        <Link type="submit" className="btn btn-dark experiment-btn" innerRef={this.checkLogin} to={'/user-page'}>
                            Login >
                        </Link>
                    </div>                
                </form>
        )
    }
}

export default LoginPage;