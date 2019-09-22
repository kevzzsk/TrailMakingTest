import React, { Component } from 'react';
import {AppBar, Typography, IconButton, Toolbar} from '@material-ui/core';
import { Link } from "react-router-dom";


class Appbar extends Component  {
    render() {
        return (
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">Trail Making Test</Typography>
                        <Link to={'/login'} className="ml-auto">
                            <IconButton edge="end" color="inherit">Login</IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
        )
    }
}


export default Appbar;