import React, { Component } from 'react'
import SignInLink from './SignInLink'

import {AppBar,Typography,IconButton,MenuIcon,Button,Toolbar} from '@material-ui/core'

class Appbar extends Component  {
    render() {
        return (
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">Trail Making Test</Typography>
                        <IconButton edge="end" color="inherit" className="ml-auto">Login</IconButton>
                    </Toolbar>
                </AppBar>
        )
    }
}


export default Appbar;