import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, TextField, CircularProgress } from "@material-ui/core"
import Footer from './Footer'
import Appbar from './Appbar'
import axios from "axios"

class HomePage extends Component {

    state = {
        id: null,
        error: "",
        loading: false
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        console.log("SUBMIT")
        this.showLoader()
        axios.get(`https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/viewExperiment?experimentID=${this.state.id}`)
            .then(res => {
                this.setState({
                    error: ""
                })
                console.log(res)
                this.hideLoader()
                this.props.history.push({
                    pathname: '/form', state: {
                        experimentID: this.state.id,
                        expIndex: 0,
                        activeStep: 0,
                        trails: res.data.templateExperiments
                    }
                })
            })
            .catch(err => {
                this.setState({
                    error: "Enter a valid ID"
                })
                this.hideLoader()
            })
    }


    hideLoader = () => {
        this.setState({ loading: false });
    }

    showLoader = () => {
        this.setState({ loading: true });
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ""
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
                        <FormControl variant="outlined" className="w-100">
                            <TextField
                                required
                                id="outlined-id"
                                label="Experiment ID"
                                placeholder="U001"
                                name="id"
                                error={this.state.error.length > 0}
                                onChange={this.handleOnChange}
                                value={this.state.id}
                                margin="normal"
                                variant="outlined"
                                type="text"
                                rowsMax={1}
                            />
                        </FormControl>
                        {this.state.error.length > 0 && <small style={{ color: "#D8000C" }}>{this.state.error}</small>}
                        <small className="form-text text-muted">By continuing you comply with tnc.</small>
                        <div className="position-relative">
                            <button disabled={this.state.loading} type="submit" className="btn experiment-btn" >Continue</button>
                            {this.state.loading && <CircularProgress size={40} className="button-loading" />}
                        </div>
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