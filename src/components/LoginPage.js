import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Snackbar,
    SnackbarContent,
    FormControl,
    TextField,
    CircularProgress,
    Paper
} from '@material-ui/core';
import axios from 'axios';



/**
 * Display Login forms
 */
class LoginPage extends Component {

    cancelToken = axios.CancelToken;
    souce = this.cancelToken.source();

    state = {
        username: "",
        password: "",
        success: null,
        error: "",
        loading: false,
        accountType: 0
    }
    
    /** cancel subscription and unmount safely */
    componentWillUnmount() {
        this.souce.cancel("Operation Cancelled")
    }

    /**
     * @method
     * @description Generic handler for all events
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ""
        })
    }

    /**
     * @method
     * @description Hide Loader animation
     */
    hideLoader = () => {
        this.setState({ loading: false });
    }
    /**
     * @method
     * @description Show Loader animation
     */
    showLoader = () => {
        this.setState({ loading: true });
    }

    /**
     * @method
     * @description Verify Login particulars with backend
     */
    checkLogin = () => {
        this.showLoader()
        try {
            console.log(this.state)
            // checks login details against DB
            axios.get('https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/login', {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then(res => {
                    console.log(res)
                    this.hideLoader()
                    this.props.login(res.data)
                })
                .catch(e => {
                    //console.log(e)
                    this.setState({
                        success: false,
                        error: "wrong credentials"
                    })
                    this.hideLoader()
                });
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request cancelled", err.message);

            }
        }
    }

    render() {
        return (
            <div className="login-bg">
                <Paper className="m-auto login-item">
                    <form>
                        <div className="p-5">
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    required
                                    id="outlined-username"
                                    label="Username"
                                    name="username"
                                    error={this.state.error.length > 0}
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    margin="normal"
                                    variant="outlined"
                                    type="username"
                                    rowsMax={1}
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    required
                                    id="outlined-password"
                                    label="Password"
                                    name="password"
                                    error={this.state.error.length > 0}
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    autoComplete="current-password"
                                    rowsMax={1}
                                />
                            </FormControl>
                            <div className="position-relative mt-4">
                                <Button disabled={this.state.loading} className="btn experiment-btn" style={{ fontSize: "1rem" }} onClick={this.checkLogin}>
                                    Login >
                                </Button>
                                {this.state.loading && <CircularProgress size={40} className="button-loading" />}
                            </div>
                            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={this.state.success === false} autoHideDuration={600}>
                                <SnackbarContent variant="error" message="Wrong Username/Password!" />
                            </Snackbar>

                            <div className="mt-2">
                                <Link to={'/sign-up-page'}>
                                    <span style={{ color: "#A0A0A0" }}>Sign up</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/forget-password'}>
                                    <span style={{ color: "#A0A0A0" }}>Don't remember your password?</span>
                                </Link>
                            </div>


                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default LoginPage;