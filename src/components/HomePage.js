import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'
import Appbar from './Appbar'
class HomePage extends Component {

    state = {
        id: null
    }

    submitFormHandler = (event) => {
        event.preventDefault();

        console.log(this.id)
    }
    handleChange = (e) => {
        this.setState({
            id: e.target.value
        })
    }

    render() {
        return (
            <div>
                <header className="header-bg">
                    <div className="head">
                        <h1>"Every 3 seconds someone in the world develops dementia"</h1>
                        <div>
                            <p>Vestibulum vel viverra tortor, ac volutpat metus. Curabitur nulla ligula, consectetur consequat lacus ullamcorper, accumsan viverra nisl. Aliquam erat volutpat. Etiam turpis leo, laoreet eget metus in, faucibus venenatis leo.</p>
                        </div>
                    </div>

                </header>
                <h2 className="text-center m-0 text-uppercase">Try Our Experiment</h2>
                <form onSubmit={this.submitFormHandler}>
                    <div className="form-group experiment">
                        <br />
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Experiment ID (e.g. R1232)" ref={(id) => this.id = id} onChange={this.handleChange} />
                        <small className="form-text text-muted">By continuing you comply with tnc.</small>
                        <Link to={{
                            pathname: '/form', state: {
                                experimentID: this.state.id,
                                expIndex: 0,
                                activeStep:0
                            },

                        }}><button type="submit" className="btn experiment-btn" >Continue</button></Link>
                    </div>
                </form>
                <section className="intro" ref={this.props.aboutRef}>
                    <h2>About Us</h2>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel gravida nisi. Vestibulum ac consequat lorem. In in mi massa. Donec ut tellus sit amet sem ornare fermentum at et nunc. Pellentesque ac elementum metus. Praesent non venenatis lacus. In sagittis urna in nulla sagittis mattis.</p>
                    </div>
                </section>


                <div className="top-services">
                    <h2>We Are Looking For</h2>
                    <div className="services">
                        <div className="service-one">
                            <p className="service-icon"><i className="fas fa-users"></i></p>
                            <p className="service-title">Participants</p>
                            <p>Mauris vitae turpis ut sem blandit consequat et at ligula. Suspendisse quam lectus, tristique dapibus sapien et, tempus suscipit nisl.</p>
                        </div>
                        <div className="service-two">
                            <p className="service-icon"><i className="fas fa-user-graduate"></i></p>
                            <p className="service-title">Researchers</p>
                            <p>Nulla eu metus faucibus, vehicula tortor quis, venenatis odio. Nullam purus mauris, feugiat in odio vitae, posuere volutpat libero. Sed et convallis libero.</p>

                        </div>
                        <div className="service-three">
                            <p className="service-icon"><i className="fas fa-user-md"></i></p>
                            <p className="service-title">Doctors</p>
                            <p>Ut ornare vitae enim a rhoncus. Nullam aliquet tristique scelerisque. Sed volutpat dictum risus ac laoreet. Suspendisse id lorem in enim sollicitudin varius.</p>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HomePage;