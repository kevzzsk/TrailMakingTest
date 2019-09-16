
import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class HomePage extends Component {
    render() {
        return (
            <form>
                <div className="form-group experiment">
                    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Experiment ID" />
                    <small className="form-text text-muted">By continuing you comply with tnc.</small>
                    <Link to={'/experiment'}><button type="button" className="btn btn-dark experiment-btn" >Continue</button></Link>
                </div>
                
            </form>
        )
    }
}

export default HomePage;