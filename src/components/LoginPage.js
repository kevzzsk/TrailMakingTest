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
                    <div className="form-group experiment">
                        <br/>
                        <label style={{fontFamily:'Helvetica'}}>Enter your username</label>
                        <input type="Username" className="form-control" placeholder="Username" ref={(username) => this.username = username} onChange={this.handleUsername}/>
                        <label style={{paddingTop:10, fontFamily:'Helvetica'}}>Enter your password</label>
                        <input type="Password" className="form-control" placeholder="Password" ref={(password) => this.password = password} onChange={this.handlePassword}/>
                        <br/>

                        <Link type="submit" className="btn btn-dark experiment-btn" innerRef={this.checkLogin} to={'/user-page'}>
                            Login >
                        </Link>
                        
                        <Link to={'/sign-up-page'}>
                            <span style={{color:"#A0A0A0"}}>Sign up</span>
                        </Link>
                        
                        <br/>
                        
                        <Link to={'/forget-password'}>
                            <span style={{color:"#A0A0A0"}}>Don't remember your password?</span>
                        </Link>
                    </div>                
                </form>
        )
    }
}

export default LoginPage;