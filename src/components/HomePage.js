
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class HomePage extends Component {

    state={
        id: null
    }

    submitFormHandler = (event) => {
        event.preventDefault();

        console.log(this.id)
    }
    handleChange = (e) =>{
        this.setState({
            id: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitFormHandler}>
                    <div className="form-group experiment">
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Experiment ID" ref={(id)=> this.id = id} onChange={this.handleChange}/>
                        <small className="form-text text-muted">By continuing you comply with tnc.</small>
                        <Link to={{
                            pathname: '/experiment', state: {
                                experimentID:this.state.id,
                                expIndex:0
                            },
                            
                        }}><button type="submit" className="btn btn-dark experiment-btn" >Continue</button></Link>
                    </div>

                </form>
            </div>
        )
    }
}

export default HomePage;