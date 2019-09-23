import React, {Component} from 'react';
import { Link } from '@material-ui/core';

class SignUpPage extends Component{

    handleSubmit = () => {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group experiment" style={{fontFamily:'Helvetica'}}>
                        <label>REGISTER YOUR USERNAME</label>
                        <input type="username" className="form-control" placeholder="Username"></input>
                        <br/>
                        <label>ENTER YOUR EMAIL ADDRESS</label>
                        <input type="email" className="form-control" placeholder="Email address"></input>
                        <br/>
                        <label>ENTER A PASSWORD</label>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <br/>
                        <label>RE-ENTER YOUR PASSWORD</label>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <br/>
                        <Link>
                            <button type="submit" className="btn btn-dark experiment-btn">Submit</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage;