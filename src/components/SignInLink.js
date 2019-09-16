import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

class SignInLink extends Component {
    render() {
        return (
                <ul className="list-group list-group-horizontal">
                    <li><NavLink to="/">New Experiment</NavLink></li>
                    <li><NavLink to="/">Log Out</NavLink></li>
                    <li><NavLink to="/" className="btn">KK</NavLink></li>
                </ul>
        )
    }
}


export default SignInLink;