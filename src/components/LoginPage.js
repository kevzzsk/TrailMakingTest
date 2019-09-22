import React, { Component } from 'react'
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
                <div>
                    <input type="Username" className="form-control" placeholder="Username" ref={(username) => this.username = username} onChange={this.handleUsername}/>
                    <input type="Password" className="form-control" placeholder="Password" ref={(password) => this.password = password} onChange={this.handlePassword}/>
                    <Link innerRef={this.checkLogin} to={'/userPage'}>
                        <button type="button" className="btn btn-dark experiment-btn" >Login ></button>
                    </Link>
                </div>                
            </form>
        )
    }
}

export default LoginPage;