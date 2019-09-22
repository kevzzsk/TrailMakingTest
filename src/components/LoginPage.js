import React, { Component } from 'react'
import {Link} from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <form>
                <div>
                    <input type="Username" className="form-control" placeholder="Username" />
                    <input type="Password" className="form-control" placeholder="Password" />
                    <Link to={'/'}><button type="button" className="btn btn-dark experiment-btn" >Login</button></Link>
                </div>                
            </form>
        )
    }
}

export default LoginPage;