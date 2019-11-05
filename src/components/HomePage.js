import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, TextField, CircularProgress } from "@material-ui/core"
import Footer from './Footer'
import Appbar from './Appbar'
import axios from "axios"

class HomePage extends Component {

    state = {
        id: "",
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
                            <p>There were an estimated 50 million people worldwide living with dementia in 2017. This number will almost double every 20 years, reaching 75 million in 2030 and 131.5 million in 2050.
Much of the increase will be in low and middle income countries. Already 58% of people with dementia live in low and middle income countries, but by 2050 this will rise to 68%. </p>
                        </div>
                    </div>

                </header>
                <form id = "experiment_form" onSubmit={this.submitFormHandler}>
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
                        <small className="form-text text-muted">By continuing you comply with our terms and cconditions.</small>
                        <div className="position-relative">
                            <button disabled={this.state.loading} type="submit" className="btn experiment-btn" id="submitButton" >Try Experiment</button>
                            {this.state.loading && <CircularProgress size={40} className="button-loading" />}
                        </div>
                    </div>
                </form>
                <section className="intro" ref={this.props.aboutRef}>
                    <h2>About Us</h2>
                    <div>
                        <p>We are a group of students from NTU who have developed an application based on Trail Making Tests for researchers and doctors alike to diagnose and treat patients with dementia.
                            Researchers are able to use our application for research purposes by getting participants to use our application.
                        </p>
                    </div>
                </section>


                <div className="top-services">
                    <h2>We Are Looking For</h2>
                    <div className="services">
                        <div className="service-one">
                            <p className="service-icon"><i className="fas fa-users"></i></p>
                            <p className="service-title">Participants</p>
                            <p>Participants of research groups to aid in the research of dementia.</p>
                        </div>
                        <div className="service-two">
                            <p className="service-icon"><i className="fas fa-user-graduate"></i></p>
                            <p className="service-title">Researchers</p>
                            <p>Scientists and researchers currently making great strides in identifying potential new ways to help diagnose, treat, and even prevent Alzheimer's and related dementias.</p>

                        </div>
                        <div className="service-three">
                            <p className="service-icon"><i className="fas fa-user-md"></i></p>
                            <p className="service-title">Doctors</p>
                            <p>Doctors trained in brain conditions (neurologist) or doctors trained to treat older adults (geriatrician).</p>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HomePage;