import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/** ForgetPass page for user who need to reset their password */
class ForgetPassPage extends Component{

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group experiment" style={{fontFamily:'Helvetica'}}>
                        <br/>
                        <label>Enter your account's email address: </label>
                        <input type="email" className="form-control" placeholder="Email address"></input>
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

export default ForgetPassPage;