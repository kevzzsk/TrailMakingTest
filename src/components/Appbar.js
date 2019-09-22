import React, { Component } from 'react';
import {AppBar, Typography, IconButton, Toolbar} from '@material-ui/core';
import { Link } from "react-router-dom";

class Appbar extends Component {

    render() {
        return (
                <AppBar position="static">
                    <Toolbar>
                        
                        <Link to={'/'}>
                            <Typography variant="h6">Trail Making Test</Typography>
                        </Link>

                        <Link to={'/login'}>
                            <IconButton edge="end" color="inherit" className="ml-auto">Login</IconButton>
                        </Link>

                    </Toolbar>
                </AppBar>
        )
    }
}


export default Appbar;