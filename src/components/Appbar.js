import React, { Component } from 'react';
import { AppBar, Typography, Button, Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";


class Appbar extends Component {


    
    render() {
        return (
            <nav className="appbar">
                <ul>
                    <li><Link to={'/'}>
                        Trail Making Test
                    </Link>
                    </li>

                </ul>

                <ul>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Mission</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><Link to={'/login'}>
                        Login
                        </Link>
                    </li>
                </ul>

            </nav>
        )
    }
}


export default Appbar;