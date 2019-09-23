import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SignUpPage extends Component{

    handleSubmit = () => {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group experiment" style={{fontFamily:'Helvetica'}}>
                        <br/>
                        <label>Register your username</label>
                        <input type="username" className="form-control" placeholder="Username"></input>
                        <br/>
                        <label>Enter your email address</label>
                        <input type="email" className="form-control" placeholder="Email address"></input>
                        <br/>
                        <label>Enter a password</label>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <br/>
                        <label>Re-enter your password</label>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <br/>
                        <Link to={'/login'}>
                            <button type="submit" className="btn btn-dark experiment-btn">Submit</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage;